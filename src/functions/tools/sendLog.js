const Guild = require('../../schemas/guild.js');
const mongoose = require('mongoose');

module.exports = (client) => {
    client.sendLog = async (guild, message, type) => {
        let guildSettings = await Guild.findOne({ guildID: guild.id });
        if (!guildSettings) {
            guildSettings = new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: guild.id
            });
            await guildSettings.save().catch(console.error);
        }

        if (type === 'mod') {
            const modLogChannel = guild.channels.cache.get(guildSettings.mod_log_channel_id);

            if (!modLogChannel) return;

            await modLogChannel.send({ embeds: [message] });
        } else if (type === 'event') {
            const eventLogChannel = guild.channels.cache.get(guildSettings.event_log_channel_id);

            if (!eventLogChannel) return;

            await eventLogChannel.send({ embeds: [message] });
        }
    };
};