const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setName('unban')
        .setDescription('Unban a member from the server.')
        .addStringOption((option) =>
            option
                .setName('userid')
                .setDescription('UserID of the user to unban from the server.')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('reason')
                .setDescription('Reasoning for unbanning the user.')
                .setRequired(false)
        ),
    async execute(interaction, client) {
        const userId = interaction.options.getString('userid');

        try {
            await interaction.guild.members.unban(userId);

            interaction.reply({
                content: `✅ - Successfully banned \`${userId}\` from ${interaction.guild.name}.`,
                ephemeral: true
            });

            const embed = new EmbedBuilder();

            embed.setColor('White');
            embed.setAuthor({ name: interaction.guild.name });
            embed.setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
            embed.setDescription(`**🔨\`${userId}\` has been unbanned from ${interaction.guild.name}**`);
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
                    name: 'User ID',
                    value: `\`${userId}\``
                },
                {
                    name: 'Reasoning',
                    value: reason || '*No reason given.*'
                }
            );
            embed.setTimestamp(Date.now());

            client.sendLog(interaction.guild, embed, 'mod');
        } catch (error) {
            console.log(error);

            interaction.reply({
                content: '❌ - I was unable to unban that user. Please put in a valid UserID.',
                ephemeral: true
            });
        }
    }
}