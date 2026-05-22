const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ChannelType
} = require("discord.js");

const axios = require("axios");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// quando entra no servidor
client.on("guildCreate", async (guild) => {

  try {

    const channel = await guild.channels.create({
      name: "nudae-resenhuda",
      type: ChannelType.GuildText
    });

    channel.send(
      "Olá sou a Nudae Destruidora da Mudae sou sem cooldown 🤑"
    );

  } catch (err) {
    console.log(err);
  }
});

// comando $X
client.on("messageCreate", async (message) => {

  if (message.author.bot) return;

  if (message.content === "$X") {

    try {

      // ID aleatório gigante
      const randomId =
        Math.floor(Math.random() * 200000);

      // pega personagem
      const res = await axios.get(
        `https://api.jikan.moe/v4/characters/${randomId}/full`
      );

      const char = res.data.data;

      // evita personagem quebrado
      if (!char || !char.images?.jpg?.image_url) {

        return message.reply(
          "a nudae puxou um personagem inexistente ☠️"
        );
      }

      // origem anime/manga
      let source = "Origem desconhecida";

      if (char.anime?.length > 0) {
        source = char.anime[0].anime.title;
      }
      else if (char.manga?.length > 0) {
        source = char.manga[0].manga.title;
      }

      // embed
      const embed = new EmbedBuilder()
        .setTitle(char.name)
        .setDescription(`Origem: ${source}`)
        .setImage(char.images.jpg.image_url)
        .setFooter({
          text: "Nudae Resenhuda ☠️"
        });

      // envia
      message.reply({
        embeds: [embed]
      });

    } catch (err) {

      console.log(err);

      message.reply(
        "a nudae encontrou um personagem amaldiçoado ☠️"
      );
    }
  }
});

client.once("ready", () => {
  console.log(`Nudae online como ${client.user.tag}`);
});

// TOKEN DO BOT
client.login("SEU_TOKEN");
