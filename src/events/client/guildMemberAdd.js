const Discord = require('discord.js');
const Guild = require('../../schemas/guild');
const mongoose = require('mongoose');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        const guild = member.guild;

        let guildSettings = await Guild.findOne({ guildID: guild.id });
        if (!guildSettings) {
            guildSettings = new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: guild.id
            });
            await guildSettings.save().catch(console.error);
        }
        
        if (guildSettings) {
			const bots = guild.members.cache.filter(member => member.user.bot);
            const people = guild.memberCount - bots.size;
            
            const memberChannel = guild.channels.resolve(guildSettings.member_count_channel_id);
            const peopleChannel = guild.channels.resolve(guildSettings.people_count_channel_id);
            const botChannel = guild.channels.resolve(guildSettings.bot_count_channel_id);
			
            if (memberChannel) {
                memberChannel.setName(`Members: ${guild.memberCount}`);
            } else {
                return;
            }
            if (peopleChannel) {
                peopleChannel.setName(`People: ${people}`);
            } else {
                return;
            }
            if (botChannel) {
                botChannel.setName(`Bots: ${bots.size}`);
            } else {
                return;
            }
        }

        const welcomeEmbed = new Discord.EmbedBuilder();
        
        const description = guild.description || "No description has been set for this server! But here, I'll just say this is a lil community Discord server.";

        welcomeEmbed.setColor('Gold');
        welcomeEmbed.setAuthor({ name: guild.name });
        welcomeEmbed.setDescription(`**👋 Hello! Welcome to ${guild.name}**`);
        welcomeEmbed.addFields(
            {
                name: 'About the server',
                value: `*${description}*`
            },
            {
                name: 'About Marisa Bot',
                value: 'Hello! I\'m Marisa Bot! I\'m a bot that\'s made to help you moderate this server. I\'m still in development, so there might be some bugs. If you find any bugs, please report them in the **[support server](https://discord.gg/BxMFPsVerb)** or create an issue on the **[github repo](https://github.com/MarisaGaming01/Marisa-Bot)**.'
            }
        );
        welcomeEmbed.setThumbnail(guild.iconURL());
        welcomeEmbed.setImage("https://cdn.discordapp.com/attachments/1061450162544848967/1062184077333102692/touhou-marisa.gif");
        welcomeEmbed.setFooter({ text: guild.name, iconURL: guild.iconURL() });
        welcomeEmbed.setTimestamp(Date.now());

        try {
            await member.send({
                embeds: [welcomeEmbed]
            });
        } catch { }
    }
}
