const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.user.setPresence({
            activities: [
                {
                    name: `Rebooting...`,
                    type: ActivityType.Playing
                }
            ],
            status: 'idle'
        });
        setInterval(client.pickPresence, 60 * 1000);
        console.log(`Logged in as ${client.user.tag}`);
    }
}