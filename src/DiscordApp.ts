import { ActivityType, Client, GatewayIntentBits, Message } from "discord.js";
import Config from "./config/Config";
import MessageHandler from "./handler/MessageHandler";

export class DiscordApp {
  private static readonly client: Client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  });

  constructor() {
    DiscordApp.client.on("ready", () => this.clientIsReady());
    DiscordApp.client.on("messageCreate", (message: Message) => this.handleMessages(message));
  }

  public async start(): Promise<void> {
    await DiscordApp.client.login(Config.DISCORD_BOT_TOKEN);
  }

  private clientIsReady(): void {
    if (DiscordApp.client.user?.tag == null) {
      console.error("Could not login to Discord api");
      return;
    }
    console.log(`Logged in as ${DiscordApp.client.user?.tag}!`);
    this.setPresence();
    setInterval(() => {
      this.setPresence();
    }, 3600 * 1000);
  }

  public setPresence(): void {
    DiscordApp.client.user?.setPresence({
      activities: [
        {
          name: "new messages",
          type: ActivityType.Watching,
        },
      ],
    });
  }

  private handleMessages(message: Message) {
    new MessageHandler(message).handle();
  }
}

export default DiscordApp;
