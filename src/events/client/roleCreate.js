const Discord = require('discord.js');

module.exports = {
    name: 'roleCreate',
    async execute(role, client) {
        const embed = new Discord.EmbedBuilder();

        embed.setColor('Green');
        embed.setAuthor({ name: role.guild.name });
        embed.setDescription(`**🎖️ New Role Created:** <@&${role.id}>`);
        embed.addFields(
            {
                name: 'Role Name',
                value: role.name
            },
            {
                name: 'Role ID',
                value: `\`${role.id}\``
            }
        );
        embed.setFooter({ text: role.guild.name, iconURL: role.guild.iconURL() });
        embed.setTimestamp(Date.now());

        client.sendLog(role.guild, embed, 'mod');
    }
}