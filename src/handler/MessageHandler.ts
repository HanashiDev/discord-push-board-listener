import axios from "axios";
import { Message, ThreadChannel } from "discord.js";
import * as config from "../../config/config.json";

export class MessageHandler {
  private message: Message;

  constructor(message: Message) {
    this.message = message;
  }

  public async handle(): Promise<void> {
    if (
      !(this.message.channel instanceof ThreadChannel) ||
      this.message.guildId != config.discord.guildID ||
      this.message.id == this.message.channelId
    ) {
      return;
    }

    const payload = {
      discordThreadID: this.message.channelId,
      discordMessageID: this.message.id,
      userID: this.message.author.id,
      username: this.message.author.username,
      time: Math.round(this.message.createdTimestamp / 1000),
      content: this.message.content,
    };
    await axios.post(config.webhookURL, payload, {
      headers: {
        authorization: config.secret
      }
    }).catch(() => {
      // do nothing
    });
  }
}

export default MessageHandler;
