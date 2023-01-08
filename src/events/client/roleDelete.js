const Discord = require('discord.js');

module.exports = {
    name: 'roleDelete',
    async execute(role, client) {
        const embed = new Discord.EmbedBuilder();

        embed.setColor('Red');
        embed.setAuthor({ name: role.guild.name });
        embed.setDescription(`**🗑️ Role Deleted:** \`${role.name}\``);
        embed.addFields(
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