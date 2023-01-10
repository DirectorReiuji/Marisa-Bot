const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("runtime")
        .setDescription("Replies with the bot current runtime."),
    execute(interaction, client) {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 23
        let minutes = Math.floor(client.uptime / 60000) % 60
        let seconds = Math.floor(client.uptime / 1000) % 60
        const embed = new EmbedBuilder()
            .setColor("Gold")
            .setAuthor({ name: "⌛ Uptime" })
            .setDescription(`My uptime is \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds`)
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
            .setTimestamp(Date.now());
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
}