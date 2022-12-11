declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_BOT_TOKEN: string;
            DISCORD_GUILD_ID: string;
            WOLTLAB_WEBHOOK_URL: string;
            WOLTLAB_WEBHOOK_SECRET: string;
        }
    }
}
export {};
