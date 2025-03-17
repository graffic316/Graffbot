import { createClient } from "@retconned/kick-js";
import "dotenv/config";

const client = createClient("xqc", { logger: true, readOnly: true });
// readOnly: true will make the client only read messages from the chat, and disable all other authenticated actions.

client.login({
  type: "login",
  credentials: {
    username: "xqc",
    password: "bigschnozer420",
    otp_secret: "your-2fa-secret",
  },
});
// to get your OTP secret, you need to go to https://kick.com/settings/security and enable Two-Factor Authentication and copy the secret from there

// you can also authenticate using tokens obtained from the kick website directly by switching the type to 'tokens'
client.login({
  type: "tokens",
  credentials: {
    bearerToken: process.env.BEARER_TOKEN,
    cookies: process.env.COOKIES,
  },
});

client.on("ready", () => {
  console.log(`Bot ready & logged into ${client.user?.tag}!`);
});

client.on("ChatMessage", async (message) => {
  console.log(`${message.sender.username}: ${message.content}`);
});

// get information about a vod
// your-video-id = vod uuid
const { title, duration, thumbnail, views } = await client.vod("your-video-id");

// get leaderboards for a channel
const leaderboards = await client.getLeaderboards();
// you can also pass in a kick-channel-name to get leaderboards for a different channel
// example: const leaderboards = await client.getLeaderboards("xqc");

// get polls for a channel
const polls = await client.getPolls();
// you can also pass in a kick-channel-name to get polls for a different channel
// example: const polls = await client.getPolls("xqc");