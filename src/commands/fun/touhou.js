const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('touhou')
        .setDescription('Grabs posts from r/Touhou'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder();
        
        let data = await fetch("http://www.reddit.com/r/touhou/random/.json").then(async res => {
        	let post = await res.json();
            
            let title = post[0].data.children[0].data.title;
            let url = post[0].data.children[0].data.url;
            let upvotes = post[0].data.children[0].data.ups;
            
            return interaction.reply({ embeds: [
                embed.setColor("Gold").setFooter({ text: upvotes + " Upvotes", iconURL: interaction.guild.iconURL() }).setTimestamp().setTitle(title).setURL(url).setImage(url)
            ]})
        });
	}
}