const Discord = require('discord.js');

module.exports = {
    name: 'messageUpdate',
    async execute(oldMessage, newMessage, client) {
        if (newMessage.author.bot) return;

        if (oldMessage.content !== newMessage.content) {
            const oldMessageContent = oldMessage.content.length > 1024 ? oldMessage.content.substr(0, 1023) + '…' : oldMessage.content;
            const newMessageContent = newMessage.content.length > 1024 ? newMessage.content.substr(0, 1023) + '…' : newMessage.content;

            const embed = new Discord.EmbedBuilder();

            embed.setColor('Yellow');
            embed.setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.avatarURL() });
            embed.setDescription(`**✏️ ${newMessage.author.username}'s Message Updated in:** <#${newMessage.channel.id}>**.\n[⤷ Jump to Message](${newMessage.url})**`);
            embed.addFields(
                {
                    name: 'User',
                    value: `<@${newMessage.author.id}>`
                },
                {
                    name: 'User ID',
                    value: `\`${newMessage.author.id}\``
                },
                {
                    name: 'Before Edit',
                    value: `\`\`\`${oldMessageContent}\`\`\``
                },
                {
                    name: 'After Edit',
                    value: `\`\`\`${newMessageContent}\`\`\``
                }
            );
            embed.setFooter({ text: newMessage.guild.name, iconURL: newMessage.guild.iconURL() });
            embed.setTimestamp(Date.now());

            client.sendLog(newMessage.guild, embed, 'event');
        }
    }
}