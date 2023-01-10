const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setName('ban')
        .setDescription('Ban a member from the server.')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('User to ban from the server.')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('reason')
                .setDescription('Reasoning for banning the user.')
                .setRequired(false)
        ),
    async execute(interaction, client) {
        const user = interaction.options.getUser('user');
        const member = await interaction.guild.members.fetch(user.id);

        const reason = interaction.options.getString('reason');

        if (member.roles.highest.position >= interaction.member.roles.highest.position) {
            interaction.reply({
                content: '❌ - You cannot ban a member with a higher or equal role than you.',
                ephemeral: true
            });

            return;
        } else {
            interaction.reply({
                content: `✅ - Successfully banned ${user.username} from ${interaction.guild.name}.`,
                ephemeral: true
            });
        }

        await member.ban({reason})

        const embed = new EmbedBuilder();

        embed.setColor('DarkRed');
        embed.setAuthor({ name: interaction.guild.name });
        embed.setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
        embed.setDescription(`**🔨${user.username} has been banned from ${interaction.guild.name}**`);
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
                name: 'Reasoning',
                value: reason || '*No reason given.*'
            }
        );
        embed.setTimestamp(Date.now());

        client.sendLog(interaction.guild, embed, 'mod');
    }
}