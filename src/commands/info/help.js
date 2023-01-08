const { SlashCommandBuilder, ActionRowBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const _ = require('lodash');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help on the bot\'s commands.'),
    async execute(interaction, client) {
        const emojis = {
            info: '📝',
            moderation: '🔨',
        };

        const directories = [
            ...new Set(client.commands.map((cmd) => cmd.folder)),
        ];

        const categories = directories.map((dir) => {
            const getCommands = client.commands
                .filter((cmd) => cmd.folder === dir)
                .map((cmd) => {
                    return {
                        name: cmd.data.name,
                        description: cmd.data.description || 'No description set',
                    };
                });

            return {
                directory: dir,
                commands: getCommands,
            };
        });

        const embed = new Discord.EmbedBuilder()
            .setColor('Gold')
            .setAuthor({ name: 'Help Menu' })
            .setDescription(
                '**Please choose a category in the menu below.**'
            )
            .addFields(
                {
                    name: 'About me',
                    value: '*Marisa Bot ✨ is an all-in-one purpose bot created by **Marisa Moment#2023**.*\n\nFeel free to join the **[official support server](https://discord.gg/BxMFPsVerb)** and ask for any help you need.',
                }
            )
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
            .setTimestamp(Date.now());

        const components = (state) => [
            new ActionRowBuilder().addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId('help-menu')
                    .setPlaceholder('Select a category')
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: _.startCase(cmd.directory),
                                value: cmd.directory,
                                description: `View ${cmd.directory} commands`,
                                emoji: emojis[cmd.directory || null],
                            };
                        })
                    )
            ),
        ];

        const initialMessage = await interaction.reply({
            embeds: [embed],
            components: components(false),
            ephemeral: true,
        });

        const filter = (interaction) => interaction.user.id === interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            componentType: Discord.ComponentType.StringSelect,
        });

        collector.on('collect', (interaction) => {
            const [directory] = interaction.values;

            const category = categories.find(
                (x) => x.directory === directory
            );

            const embed = new Discord.EmbedBuilder()
                .setColor('Gold')
                .setTitle(`${emojis[directory || null]} ${_.startCase(directory)} Commands`)
                .setDescription(`**A list of all ${directory} related commands.**`)
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `\`/${cmd.name}\`:`,
                            value: `*${cmd.description}*`,
                            inline: true,
                        };
                    })
                )
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setTimestamp(Date.now());

            interaction.update({
                embeds: [embed],
            });
        });

        collector.on('end', () => {
            initialMessage.edit({ components: components(true) });
        });
    }
}