const Discord = require('discord.js');

module.exports = {
    name: 'channelDelete',
    async execute(channel, client) {
        const embed = new Discord.EmbedBuilder();

        embed.setColor('Red');
        embed.setAuthor({ name: channel.guild.name });
        if (channel.type === Discord.ChannelType.GuildText || channel.type === Discord.ChannelType.GuildAnnouncement) {
            embed.setDescription(`**🗑️ Channel Deleted:** \`#${channel.name}\``);
        } else if (channel.type === Discord.ChannelType.GuildVoice || channel.type === Discord.ChannelType.GuildStageVoice) {
            embed.setDescription(`**🗑️ Voice Channel Deleted:** \`#${channel.name}\``);
        } else if (channel.type === Discord.ChannelType.GuildCategory) {
            embed.setDescription(`**🗑️ Category Deleted:** \`${channel.name}\``);
        } else if (channel.type === Discord.ChannelType.GuildForum) {
            embed.setDescription(`**🗑️ Forum Deleted:** \`#${channel.name}\``);
        }
        embed.addFields(
            {
                name: 'Channel ID',
                value: `\`${channel.id}\``
            }
        );
        embed.setFooter({ text: channel.guild.name, iconURL: channel.guild.iconURL() });
        embed.setTimestamp(Date.now());

        client.sendLog(channel.guild, embed, 'mod');
    }
}