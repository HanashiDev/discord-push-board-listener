import * as dotenv from "dotenv";

dotenv.config();

export default class Config {
  public static readonly DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN ?? "";
  public static readonly DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID ?? "";
  public static readonly WOLTLAB_WEBHOOK_URL = process.env.WOLTLAB_WEBHOOK_URL ?? "";
  public static readonly WOLTLAB_WEBHOOK_SECRET = process.env.WOLTLAB_WEBHOOK_SECRET ?? "";
}
