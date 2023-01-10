const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Guild = require('../../schemas/guild');
const mongoose = require('mongoose');
const _ = require('lodash');

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setName('settings')
        .setDescription('Change or get a setting key.')
        .addStringOption((option) =>
            option.setName('key')
                .setDescription('Key to set or get.')
                .setRequired(true)
                .addChoices(
                    { name: _.startCase('event_log_channel_id'), value: 'event_log_channel_id' },
                    { name: _.startCase('mod_log_channel_id'), value: 'mod_log_channel_id' },
                    { name: _.startCase('verification_channel_id'), value: 'verification_channel_id' },
                    { name: _.startCase('verified_role_id'), value: 'verified_role_id'},
                    { name: _.startCase('member_count_channel_id'), value: 'member_count_channel_id' },
                    { name: _.startCase('people_count_channel_id'), value: 'people_count_channel_id' },
                    { name: _.startCase('bot_count_channel_id'), value: 'bot_count_channel_id' }
                )
        )
        .addStringOption((option) =>
            option.setName('value')
                .setDescription('Value to set the setting to.')
                .setRequired(false)
        ),
    async execute(interaction, client) {
        let guildSettings = await Guild.findOne({ guildID: interaction.guild.id });
        if (!guildSettings) {
            guildSettings = new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: interaction.guild.id
            });
            await guildSettings.save().catch(console.error);
        }

        const key = interaction.options.getString('key');

        if (!interaction.options.getString('value')) {
            if (guildSettings[key] === undefined) {
                return interaction.reply({
                    content: `⚠️ - **${_.startCase(key)}** is not set. Please set it by using \`/settings ${key} <value>\`.`,
                    ephemeral: true
                });
            } else {
                return interaction.reply({
                    content: `📝 - **${_.startCase(key)}** is set to \`${guildSettings[key]}\`.`,
                    ephemeral: true
                });
            }
        } else {
            await Guild.findOneAndUpdate({ guildID: interaction.guild.id }, { [key]: interaction.options.getString('value') });
            if (key === 'verification_channel_id') {
                const verifyEmbed = new EmbedBuilder()
                    .setAuthor({ name: 'Verification' })
                    .setDescription('**Please press the VERIFY button to verify your account.**')
                    .setColor('Green')
                    .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
                
                const verifyChannelId = interaction.options.getString('value');
                const verifyChannel = verifyChannelId && await interaction.guild.channels.fetch(verifyChannelId);

                verifyChannel.send({
                    embeds: [verifyEmbed],
                    components: [
                        new ActionRowBuilder().setComponents(
                            new ButtonBuilder().setCustomId('verify').setLabel('VERIFY').setStyle(ButtonStyle.Success),
                        ),
                    ],
                })
            }
            if (key === 'verification_channel_id'  || key === 'verified_role_id') {
                return interaction.reply({
                content: `✅ - Successfully saved **${_.startCase(key)}** to \`${interaction.options.getString('value')}\`. Please make sure to set the other verification settings as well.`,
                ephemeral: true
            });
            } else {
                return interaction.reply({
                    content: `✅ - Successfully saved **${_.startCase(key)}** to \`${interaction.options.getString('value')}\`.`,
                    ephemeral: true
                });
            }
        }
    }
};