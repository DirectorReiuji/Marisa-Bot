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

            const verifiedRole = interaction.guild.roles.cache.find(role => role.name === 'Verified');

            if (!verifiedRole) {
                interaction.guild.roles.create({
                    name: 'Verified',
                    color: [16, 201, 98],
                    reason: 'Verified role was not found.'
                });

                interaction.member.roles.add(verifiedRole).then((member) => {
                    interaction.reply({
                        content: `✅ - Successfully assigned ${verifiedRole} to **${interaction.user.username}**.`,
                        ephemeral: true
                    })
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
        }else if (interaction.isStringSelectMenu()) {
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