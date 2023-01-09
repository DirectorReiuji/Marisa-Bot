const Discord = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member, client) {
        const auditLogs = await member.guild.fetchAuditLogs({
            limit: 1
        });

        const latestLog = auditLogs.entries.first();

        if (latestLog.action === Discord.AuditLogEvent.MemberKick || latestLog.action === Discord.AuditLogEvent.MemberBanAdd) return;
        
        const embed = new Discord.EmbedBuilder();

        embed.setColor('Red');
        embed.setAuthor({ name: member.user.tag, iconURL: member.user.avatarURL() });
        embed.setDescription(`**👋 Member Left ${member.guild.name}:** <@${member.user.id}>`);
        embed.addFields(
            {
                name: 'User ID',
                value: `\`${member.id}\``
            }
        );
        embed.setThumbnail(member.user.avatarURL());
        embed.setFooter({ text: member.guild.name, iconURL: member.guild.iconURL() });
        embed.setTimestamp(Date.now());

        client.sendLog(member.guild, embed, 'event');
    }
}