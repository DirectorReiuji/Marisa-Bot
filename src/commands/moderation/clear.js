const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setName('clear')
        .setDescription('Clear a number of messages from a channel.')
        .addIntegerOption((option) =>
            option
                .setName('amount')
                .setDescription('Amount of messages to clear.')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(99)
        )
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('User to clear messages from.')
                .setRequired(false)
        ),
    async execute(interaction, client) {
        const channel = interaction.channel;

        const amount = interaction.options.getInteger('amount');
        const user = interaction.options.getUser('user');

        const messages = await channel.messages.fetch({
            limit: amount + 1
        });

        const embed = new EmbedBuilder();

        embed.setColor('DarkRed');
        embed.setAuthor({ name: interaction.guild.name });
        embed.setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
        embed.setTimestamp(Date.now());

        if (user) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) => {
                if (msg.author.id === user.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                interaction.reply({
                    content: `✅ - Successfully cleared ${messages.size} messages from ${user}.`,
                    ephemeral: true
                });
            });

            embed.setDescription(`**🗑️ ${amount} of ${user.username}'s Messages Deleted in:** <#${interaction.channel.id}>`);
            embed.addFields(
                {
                    name: 'Moderator',
                    value: `<@${interaction.user.id}>`
                },
                {
                    name: 'Moderator ID',
                    value: `\`${interaction.user.id}\``
                },
                {
                    name: 'User',
                    value: `<@${user.id}>`
                },
                {
                    name: 'User ID',
                    value: `\`${user.id}\``
                },
                {
                    name: 'Amount Deleted',
                    value: `${amount} messages`
                }
            );
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                interaction.reply({
                    content: `✅ - Successfully cleared ${messages.size} messages from <#${interaction.channel.id}>.`,
                    ephemeral: true
                });
            });

            embed.setDescription(`**🗑️ ${amount} Messages Deleted in:** <#${interaction.channel.id}>`);
            embed.addFields(
                {
                    name: 'Moderator',
                    value: `<@${interaction.user.id}>`
                },
                {
                    name: 'Moderator ID',
                    value: `\`${interaction.user.id}\``
                },
                {
                    name: 'Amount Deleted',
                    value: `${amount} messages`
                }
            );
        }

        client.sendLog(interaction.guild, embed, 'mod');
    }
};