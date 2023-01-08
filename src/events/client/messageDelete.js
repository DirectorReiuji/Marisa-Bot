const Discord = require('discord.js');

module.exports = {
    name: 'messageDelete',
    async execute(message, client) {
        if (message.author.bot) return;

        if (message.type === Discord.MessageType.UserJoin) return;

        const messageContent = message.content.length > 1024 ? message.content.substr(0, 1023) + '…' : message.content;

        const embed = new Discord.EmbedBuilder();

        embed.setColor('Red');
        embed.setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL() });
        embed.setDescription(`**🗑️ ${message.author.username}'s Message Deleted in:** <#${message.channel.id}>`);
        embed.addFields(
            {
                name: 'User',
                value: `<@${message.author.id}>`
            },
            {
                name: 'User ID',
                value: `\`${message.author.id}\``
            },
            {
                name: 'Message',
                value: messageContent
            }
        );
        embed.setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() });
        embed.setTimestamp(Date.now());

        client.sendLog(message.guild, embed, 'event');
    }
}