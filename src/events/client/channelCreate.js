const Discord = require('discord.js');

module.exports = {
    name: 'channelCreate',
    async execute(channel, client) {
        const embed = new Discord.EmbedBuilder();

        embed.setColor('Green');
        embed.setAuthor({ name: channel.guild.name });
        if (channel.type === Discord.ChannelType.GuildText || channel.type === Discord.ChannelType.GuildAnnouncement) {
            embed.setDescription(`**💬 New Channel Created:** <#${channel.id}>`);
        } else if (channel.type === Discord.ChannelType.GuildVoice || channel.type === Discord.ChannelType.GuildStageVoice) {
            embed.setDescription(`**🔊 New Voice Channel Created:** <#${channel.id}>`);
        } else if (channel.type === Discord.ChannelType.GuildCategory) {
            embed.setDescription(`**📁 New Category Created:** \`${channel.id}\``);
        } else if (channel.type === Discord.ChannelType.GuildForum) {
            embed.setDescription(`**📝 New Forum Created:** <#${channel.id}>`);
        }
        embed.addFields(
            {
                name: 'Channel Name',
                value: channel.name
            },
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