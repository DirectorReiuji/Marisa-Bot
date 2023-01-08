const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
        .setName('setnick')
        .setDescription('Change a user\'s nickname.')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('The user to set a nick for.')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('nickname')
                .setDescription('The new nickname for the user.')
                .setRequired(false)
        ),
    async execute(interaction, client) {
        const user = interaction.options.getUser('user');
        const nickname = interaction.options.getString('nickname');

        if (user.id === client.user.id) {
            return interaction.reply({
                content: '❌ - You cannot update my nickname. Why would you want to do that?',
                ephemeral: true
            });
        }

        if (interaction.member.roles.highest.position <= interaction.guild.members.cache.get(user.id).roles.highest.position) {
            return interaction.reply({
                content: '❌ - You cannot update specified user. They have a higher role position compared to you.',
                ephemeral: true
            });
        } else if (interaction.guild.members.me.roles.highest.position <= interaction.guild.members.cache.get(user.id).roles.highest.position) {
            return interaction.reply({
                content: '😔 - I cannot update specified user. Please recheck my role position and try again.',
                ephemeral: true
            });
        }  

        if (nickname === null) {
            await interaction.guild.members.cache.get(user.id).setNickname(null);
            return interaction.reply({
                content: `✅ - Successfully reset **${user.username}**'s nick.`
            });
        }

        await interaction.guild.members.cache.get(user.id).setNickname(nickname);
        return interaction.reply({
            content: `✅ - Successfully changed **${user.username}**'s nick to *${nickname}*.`
        });
    }
};