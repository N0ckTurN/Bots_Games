const { CommandInteraction, PermissionBitfield, EmbedBuilder, ActionRowBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType, SlashCommandIntegerOption, SlashCommandBuilder } = require("discord.js");
const config = require("./config");
const ms = require ("ms");

module.exports = {
    name: "giveaway-start",
    description: "Permet de créer un giveaway",
    owner: false,
    options: [
        {
            name: "channel",
            description: "Quel est le salon ?",
            required: true,
            type: ApplicationCommandOptionType.Channel,
        },
        {
            name: "duration",
            description: "Quel est la durée ?",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "gagnant",
            description: "Quel est le nombre de gagnant ?",
            required: true,
            type: ApplicationCommandOptionType.Integer,
        },
        {
            name: "prix",
            description: "Quel est le prix du Giveaway ?",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
],

/**
 * @param {Client} client
 * @param {CommandInteraction} interaction
 */

run: async (client, interaction) => {
    if (!interaction.guild.members.me.permissions.has(PermissionBitfield.resolve("SendMessages"))) return interaction.reply({ content: `** Vous n'avez pas les autorisations du serveur ! **`})
    if(!interaction.member.permissions.has(PermissionBitfield.resolve("Administrator"))) return interaction.reply({ content: ` Vous ne pouvez utiliser cette commande ! `})

    const channel = interaction.options.getChannel('channel');
    const duration = interaction.options.getString('duration');
    const winner = interaction.options.getInteger('gagnant');
    const prize = interaction.options.getString('prix');
    
    client.giveawaysManager.start(channel, {
        duration: ms(duration),
        prize: prize,
        winnerCount: winner,
        hostedBy: interaction.user.username,
    })

    await interaction.reply({ content: `Le Giveaways à commencer dans le salon ${channel}`, ephemeral: true})
}

}