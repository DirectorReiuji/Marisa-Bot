const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setName('webhook')
        .setDescription('Send a message to a channel as the bot.')
        .addChannelOption((option) =>
            option
                .setName('channel')
                .setDescription('Channel to send the message to.')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        )
        .addStringOption((option) =>
            option
                .setName('message')
                .setDescription('Message to send. (Refer to http://discohook.org)')
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const channel = interaction.options.getChannel('channel');
        const message = interaction.options.getString('message');

        const payload = JSON.parse(message);

        await channel.send(payload);

        await interaction.reply({
            content: `✅ - Successfully sent embed to ${channel}.`,
            ephemeral: true
        });
    }
};