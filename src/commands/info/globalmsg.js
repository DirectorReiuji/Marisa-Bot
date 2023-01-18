const { Client, SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('globalmsg')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription('Create a global message for every server Marisa Bot is in.')
    .addStringOption(option =>
        option
			.setName('msg')
        	.setDescription('Provide a Bot Message')
        	.setRequired(true))
    .addStringOption(option =>
        option
			.setName('preview')
        	.setDescription('Add a picture link!')
    ),
    async execute(interaction, client) {
        if (interaction.member.user.id !== '455983313786634241') return; //My user ID, do not change unless you're testing.
        const { options } = interaction;
        const message = options.getString('msg')
        const preview = options.getString('preview')

        const UpdateEmbed = new EmbedBuilder()
        .setAuthor({ name: interaction.guild.members.me.user.username })
        .setFooter({text: `Sent by ${interaction.member.user.tag}`, iconURL: interaction.member.user.displayAvatarURL()})
        .setDescription(`**Message**: \n${message}`)
        .setTimestamp(Date.now())
        .setColor('Gold');

        

        if(preview) {
            if(isValidHttpUrl(preview)) UpdateEmbed.setImage(preview)
            else return;
        }

        const guilds = client.guilds.cache

        guilds.forEach(guild => {
            const systemChannel = guild.systemChannel;
            const announcementsChannel = guild.publicUpdatesChannel;
            let channelGeneral;

        	guild.channels.cache.forEach(channel => {
				if (channel.type === ChannelType.GuildText && channel.permissionsFor(guild.members.me).has(PermissionFlagsBits.SendMessages)) 					{
                		channelGeneral = channel;
					}
        	});
            if(announcementsChannel) {
                announcementsChannel.send({embeds: [UpdateEmbed]}).catch()
            } else {
                if (systemChannel) {
                    systemChannel.send({embeds: [UpdateEmbed]}).catch()
                } else {
                    if (channelGeneral) {
						channelGeneral.send({embeds: [UpdateEmbed]}).catch()
                    } else {
                        interaction.reply({
                    		embeds: [
                        		new EmbedBuilder()
                        		.setDescription(`❌ ${guild.name} does not have any available Channels!`)
                    		], ephemeral: true
                		})
                    }
                }
            }
        })
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`✅ Successfully sent Update to ${client.guilds.cache.size} servers!`)
                .setColor('Gold')
            ], ephemeral: true
        })
    }
}

function isValidHttpUrl(string) {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false
    }
    return url.protocol === "https:" || url.protocol === "http:";
}