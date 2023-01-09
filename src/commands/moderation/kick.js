const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setName('kick')
        .setDescription('Kick a member from the server.')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('User to kick from server.')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('reason')
                .setDescription('Reasoning for kicking the user.')
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const user = interaction.options.getUser('user');
        const member = await interaction.guild.members.fetch(user.id);

        const reason = interaction.options.getString('reason');

        if (member.roles.highest.position >= interaction.member.roles.highest.position) {
            interaction.reply({
                content: '❌ - You cannot kick a member with a higher or equal role than you.',
                ephemeral: true
            });

            return;
        } else {
            interaction.reply({
                content: `✅ - Successfully kicked ${user.username} from ${interaction.guild.name}.`,
                ephemeral: true
            });
        }

        await member.kick(reason)

        const embed = new EmbedBuilder();

        embed.setColor('DarkOrange');
        embed.setAuthor({ name: interaction.guild.name });
        embed.setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
        embed.setTimestamp(Date.now());

        embed.setDescription(`**🔨${user.username} has been kicked from ${interaction.guild.name}**`);
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

        client.sendLog(interaction.guild, embed, 'mod');
    }
}