const Discord = require('discord.js');

module.exports = {
    name: 'guildCreate',
    async execute(guild, client) {
        let channelGeneral;

        guild.channels.cache.forEach(channel => {
            if (channel.type === Discord.ChannelType.GuildText && channel.permissionsFor(guild.members.me).has(Discord.PermissionFlagsBits.SendMessages)) {
                channelGeneral = channel;
            }
        });

        if (!channelGeneral);

        const embed = new Discord.EmbedBuilder();

        embed.setColor('Gold');
        embed.setAuthor({ name: guild.name });
        embed.setDescription(`**👋 Hello! I'm Marisa Bot!**`);
        embed.addFields(
            {
                name: 'Commands',
                value: "Use `/` to view all commands. Also check out `Mhelp` for message reactions. If there's a command missing, it's either because of permissions or the command is unimplemented."
            },
            {
                name: 'Logging',
                value: 'As of **1/8/2022**, Logging is not togglable. As of now, the list of logged events are (*including, not limited to*):\n\`Role Create\`, \`Role Delete\`, \`Channel Create\`, \`Message Delete\`, etc.'
            },
            {
                name: 'Support',
                value: 'Join the **[support server](https://discord.gg/BxMFPsVerb)** for any help or issues.'
            },
            {
                name: 'Contributions',
                value: 'Contribute to the **[GitHub repository](https://github.com/MarisaGaming01/Marisa-Bot)** to help improve the bot.'
            }
        );
        embed.setFooter({ text: guild.name, iconURL: guild.iconURL() });
        embed.setTimestamp(Date.now());
        embed.setImage("https://cdn.discordapp.com/attachments/1061450162544848967/1062183154032590929/marisa-kirisame-touhou.gif");

        channelGeneral.send({ embeds: [embed] });
    }
}