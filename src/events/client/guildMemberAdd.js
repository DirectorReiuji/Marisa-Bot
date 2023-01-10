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

        if (guild.channels.cache.get(guildSettings.member_count_channel_id) === null && guild.channels.cache.get(guildSettings.people_count_channel_id) === null && guild.channels.cache.get(guildSettings.bot_count_channel_id) === null) return;

        await guild.channels.cache.get(guildSettings.member_count_channel_id).setName(`Members: ${guild.memberCount}`);
        await guild.channels.cache.get(guildSettings.people_count_channel_id).setName(`People: ${guild.members.cache.filter(m => !m.user.bot).size}`);
        await guild.channels.cache.get(guildSettings.bot_count_channel_id).setName(`Bots: ${guild.members.cache.filter(m => m.user.bot).size}`);

        const welcomeEmbed = new Discord.EmbedBuilder();

        welcomeEmbed.setColor('Gold');
        welcomeEmbed.setAuthor({ name: guild.name });
        welcomeEmbed.setDescription(`**👋 Hello! Welcome to ${guild.name}**`);
        welcomeEmbed.addFields(
            {
                name: 'About the server',
                value: `*${guild.discription}*`
            },
            {
                name: 'About Marisa Bot',
                value: 'Hello! I\'m Marisa Bot! I\'m a bot that\'s made to help you moderate this server. I\'m still in development, so there might be some bugs. If you find any bugs, please report them in the **(support server)[https://discord.gg/BxMFPsVerb]** or create an issue on the **(github repo)[https://github.com/MarisaGaming01/Marisa-Bot]**.'
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