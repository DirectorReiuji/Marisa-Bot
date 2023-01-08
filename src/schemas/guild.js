const { Schema, model } = require('mongoose');
const guildSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildID: String,
    event_log_channel_id: { type: String, required: false },
    mod_log_channel_id: { type: String, required: false },
    verification_channel_id: { type: String, required: false },
    verified_role_id: { type: String, required: false },
});

module.exports = model("Guild", guildSchema, "guilds");