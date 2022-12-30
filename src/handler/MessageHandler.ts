import axios from "axios";
import { Message, ThreadChannel } from "discord.js";
import Config from "../config/Config";

export class MessageHandler {
  private message: Message;

  constructor(message: Message) {
    this.message = message;
  }

  public handle(): void {
    if (
      !(this.message.channel instanceof ThreadChannel) ||
      this.message.guildId != Config.DISCORD_GUILD_ID ||
      this.message.id == this.message.channelId
    ) {
      return;
    }

    setTimeout(() => void this.sendResponse(), 5 * 1000);
  }

  public async sendResponse(): Promise<void> {
    const payload = {
      discordThreadID: this.message.channelId,
      discordMessageID: this.message.id,
      userID: this.message.author.id,
      username: this.message.author.username,
      time: Math.round(this.message.createdTimestamp / 1000),
      content: this.message.content,
    };
    await axios
      .post(Config.WOLTLAB_WEBHOOK_URL, payload, {
        headers: {
          authorization: Config.WOLTLAB_WEBHOOK_SECRET,
        },
      })
      .catch(() => {
        // do nothing
      });
  }
}

export default MessageHandler;
