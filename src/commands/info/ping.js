const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check the bot\'s latency and ping.'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `⌛ **Client Ping** - *${message.createdTimestamp - interaction.createdTimestamp} ms*\n⏱️ **API Latency** - *${client.ws.ping} ms*\n\nOh yeah.. 🏓 **Pong!**`;
        await interaction.editReply({
            content: newMessage
        });
    }
}