import { Composer } from "grammy";
import { inlineButton, inlineKeyboard } from "../toolkit/index.js";

const composer = new Composer();

const STICKER_RESPONSE = "🎁 Here's a kasuri-style sticker for you!";

composer.command("sticker", async (ctx) => {
  await ctx.reply(STICKER_RESPONSE, {
    reply_markup: inlineKeyboard([
      [inlineButton("⬅️ Back to menu", "menu:main")],
    ]),
  });
});

export default composer;
