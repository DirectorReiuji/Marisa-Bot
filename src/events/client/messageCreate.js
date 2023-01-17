module.exports = {
	name: 'messageCreate',
    async execute(message, client) {
    	const triggerWords = ['Mhelp', 'Mbnuuy', 'Mmarisad', 'Mredux', 'Moguu', 'Mgoogle', 'Mfishy', 'Mgoblin', 'Mlooking', 'Mviolence'];
        
    	if (message.author.bot) return;
        
        triggerWords.forEach((word) => {
    		if (message.content.includes(word)) {
                if (word === 'Mhelp') {
                    message.reply('Currently the message reactions are:\n\`Mbnuuy\`, \`Mmarisad\`, \`Mredux\`, \`Moguu\`, \`Mgoogle\`, \`Mfishy\`, \`Mgoblin\`, \`Mlooking\`, and \`Mviolence\`.');
				} else if (word === 'Mbnuuy') {
                    message.reply('https://cdn.discordapp.com/attachments/598596152719442027/1050483386101272699/trim.AD0CF02B-389C-45CF-B886-7E199AD6C820.mov');
                } else if (word === 'Mmarisad') {
                    message.reply('https://tenor.com/view/marisad-touhou-marisa-kirisame-sad-gif-20456205');
                } else if (word === 'Mredux') {
                    message.reply("Yo Redux It's been 3 years... Still not upload? C'mon man your Intro always used to Brighten My day. Make one last vid... If it get's 100 likes you can quit...");
                } else if (word === 'Moguu') {
                    message.reply("https://tenor.com/view/oguu-touhou-okuu-touhou-oguu-heart-gif-25770858");
                } else if (word === 'Mgoogle') {
                    message.reply("https://media.discordapp.net/attachments/598596152719442027/1062158808304074862/E783E5FE-AA9A-473A-B3A3-62A48EF71F8F.gif");
                } else if (word === 'Mfishy') {
                    message.reply("https://cdn.discordapp.com/attachments/414559232348913674/1062949336692039690/video01.mov");
                } else if (word === 'Mgoblin') {
                    message.reply("https://cdn.discordapp.com/attachments/715273567809568849/1064747483290402937/WE_ARE_JAPANESE_GOBLIN_MMD.mp4");
                } else if (word === 'Mlooking') {
                    message.reply("https://cdn.discordapp.com/attachments/598596152719442027/1064752769690521610/IMG_8524.jpg");
                } else if (word === 'Mviolence') {
                    message.reply("https://tenor.com/view/reimu-hakurei-reimu-hakurei-reimu-touhou-reimu-hakurei-touhou-gif-26406549");
				}
    		}
  		});
    }
}