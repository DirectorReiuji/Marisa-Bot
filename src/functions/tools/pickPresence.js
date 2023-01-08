const { ActivityType } = require('discord.js');

module.exports = (client) => {
    client.pickPresence = async () => {
        const options = [
            {
                type: ActivityType.Watching,
                text: `over ${client.guilds.cache.size} servers globally`,
                status: 'online'
            },
            {
                type: ActivityType.Listening,
                text: `Marisa Dev\'s incohrent rants`,
                status: 'idle'
            },
            {
                type: ActivityType.Streaming,
                text: `Fortnite 2 (Stolen)`,
                status: 'dnd'
            },
            {
                type: ActivityType.Playing,
                text: `/ping`,
                status: 'online'
            },
            {
                type: ActivityType.Playing,
                text: `Touhou 06: Embodiment of Scarlet Devil`,
                status: 'dnd'
            }
        ];

        const option = Math.floor(Math.random() * options.length);

        client.user.setPresence({
            activities: [
                {
                    name: options[option].text,
                    type: options[option].type
                }
            ],
            status: options[option].status
        });
    }
}