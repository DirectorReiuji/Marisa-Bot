const { Client, SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Get a users info and avatar.")
    .addUserOption(
        option => 
        option.setName("user")
        .setDescription("The user you want to get information about.")
        .setRequired(true))
    .setDMPermission(false),
    async execute(interaction, client) {
        const { options } = interaction;

        const user = options.getMember("user")

        const Response = new EmbedBuilder()
        .setTimestamp(Date.now())
        .setAuthor({name: user.user.username, iconURL: user.user.displayAvatarURL(), url: user.user.avatarURL()})
        .addFields(
        {
            name: '**Date Joined**:',
            value: user.user.createdAt.toUTCString()
        })
        .setThumbnail(user.user.displayAvatarURL({size: 512}))
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setColor('Gold');

        interaction.reply({embeds: [Response], ephemeral: true});
    }
}