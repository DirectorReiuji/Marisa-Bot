const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { searchAnime } = require('node-kitsu');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anime')
        .setDescription('Get information about an anime.')
        .addStringOption((option) =>
            option
                .setName('anime')
                .setDescription('Anime to search for.')
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const { options } = interaction;
        const anime = options.getString("anime");
        const embed = new EmbedBuilder()
        
        embed.setColor("Gold")
        embed.setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
        embed.setTimestamp();

        searchAnime(anime, 0)
            .then((result) => {
                const anime = result[0];
                const status = anime.attributes.status
                    .replace("finished", "Finished")
                    .replace("ongoing", "Ongoing")
                    .replace("current", "Currently Airing");

                if (!anime.attributes.averageRating) {
                    embed.addFields({ name: "Rating", value: `No ratings yet.` });
                } else {
                    embed.addFields({
                        name: "Rating",
                        value: `${anime.attributes.averageRating}`,
                        inline: true,
                    });
                }

                if (!anime.attributes.titles.en_us)
                    embed.setTitle(`${anime.attributes.titles.en_jp}`);
                else {
                    embed.setTitle(`${anime.attributes.titles.en_us}`);
                }

                return interaction.reply({
                    embeds: [
                        embed
                            .setThumbnail(anime.attributes.posterImage.original)
                            .setDescription(anime.attributes.synopsis)
                            .addFields([
                                {
                                    name: "Premiered on",
                                    value: anime.attributes.startDate,
                                    inline: true,
                                },
                                {
                                    name: "Japanese Title",
                                    value: `${anime.attributes.titles.en_jp}` || "Unknown.",
                                    inline: true,
                                },
                                {
                                    name: "Status",
                                    value: status,
                                    inline: true,
                                },
                            ]),
                    ],
                });
            })
            .catch(() => {
                return interaction.reply({
                    embeds: [embed.setDescription("❌ No results found. Please try again.")]
                });
            });
    }
}