const Guild = require('../../schemas/guild');
const mongoose = require('mongoose');
const _ = require('lodash');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: '❌ - ' + error.message + '. If you believe this was a mistake, please contact **Marisa Moment#2023**.' || 'An unknown error has occured. If you believe this was a mistake, please contact **Marisa Moment#2023**.',
                    ephemeral: true
                });
            }
        } else if (interaction.isButton()) {

            let guildSettings = await Guild.findOne({ guildID: interaction.guild.id });
            if (!guildSettings) {
                guildSettings = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: interaction.guild.id
                });
                await guildSettings.save().catch(console.error);
            }

            const verifiedRole = interaction.guild.roles.cache.find(role => role.id === guildSettings.verified_role_id);

            if (!verifiedRole) {
                interaction.reply({
                    content: `❌ - Failed to assign a verify role. Please contact an admin immediately.`,
                    ephemeral: true
                })
            } else {
                interaction.member.roles.add(verifiedRole).then((member) => {
                    interaction.reply({
                        content: `✅ - Successfully assigned ${verifiedRole} to **${interaction.user.username}**.`,
                        ephemeral: true
                    })
                })
            }

            /*
            const { buttons } = client;
            const { customId } = interaction;
            const button = buttons.get(customId);
            if (!button) return new Error('No button found.');

            try {
                await button.execute(interaction, client);
            } catch (error) {
                console.error(error);
            }
            */
        } else if (interaction.isStringSelectMenu()) {
            const { selectMenus } = client;
            const { customId } = interaction;
            const menu = selectMenus.get(customId);
            if (!menu) return new Error('No menu found.');

            try {
                await menu.execute(interaction, client);
            } catch (error) {
                console.error(error);
            }
        }
    }
}