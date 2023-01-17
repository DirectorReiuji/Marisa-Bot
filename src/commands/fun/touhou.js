const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('touhou')
        .setDescription('Grabs posts from Touhou related subreddits.')
    	.addStringOption((option) =>
			option
				.setName('subreddit')
                .setDescription('The subreddit to grab posts from.')
                .setRequired(true)
                .addChoices(
            		{ name: 'r/Touhou', value: 'touhou' },
            		{ name: 'r/2hujerk', value: '2hujerk' },
            		{ name: 'r/fumotouhou', value: 'fumotouhou' }
                )
    	),
    async execute(interaction, client) {
        const embed = new EmbedBuilder();
        const option = interaction.options.getString('subreddit');
        
        let data = await fetch(`http://www.reddit.com/r/${option}/random/.json`).then(async res => {
        	let post = await res.json();
            
            let title = post[0].data.children[0].data.title;
            let url = post[0].data.children[0].data.url;
            let upvotes = post[0].data.children[0].data.ups;
            
            return interaction.reply({ embeds: [
                embed.setColor("Gold").setFooter({ text: upvotes + " Upvotes", iconURL: interaction.guild.iconURL() }).setTimestamp().setTitle(title).setURL(url).setImage(url).setDescription("*If the image doesn't load/work, please press the title...*")
            ]})
        });
	}
}