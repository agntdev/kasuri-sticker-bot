# Kasuri Sticker Bot — Bot specification

**Archetype:** content

**Voice:** playful and casual — write every user-facing message, button label, error, and empty state in this voice.

A Telegram bot that delivers kasuri-style stickers on user request via the /sticker command, returning pre-made or generated stickers as Telegram-compatible files.

> This is the complete contract for the bot. Implement EVERY entry point, flow, feature, integration, and edge case below. The completeness review checks the bot against this document after each build pass.

## Primary audience

- Telegram users who collect decorative stickers
- Casual users seeking quick sticker access

## Success criteria

- Users receive a kasuri-style sticker via /sticker command
- Sticker catalog and request logs are maintained

## Entry points

Every feature must be reachable from the bot's command/button surface (button-first; only /start and /help are slash commands).

- **/start** (command, actor: user, command: /start) — Open the main menu
- **/sticker** (command, actor: user, command: /sticker) — Request a random kasuri-style sticker

## Flows

### Sticker Delivery
_Trigger:_ /sticker

1. User sends /sticker command
2. Bot selects random sticker from catalog
3. Bot sends sticker as Telegram sticker or image

_Data touched:_ Sticker request, Sticker asset

## Data entities

Durable data (must survive a restart) uses the toolkit's persistent store, never in-memory maps.

- **User** _(retention: none)_ — Telegram user interacting with the bot
  - fields: Telegram user ID
- **Sticker request** _(retention: persistent)_ — Logged request metadata for analytics/abuse monitoring
  - fields: timestamp, user ID, sticker ID
- **Sticker asset** _(retention: persistent)_ — Kasuri-style sticker image and metadata
  - fields: image data (webp/png), title, tags

## Integrations

- **Telegram** (required) — Bot API messaging
Call external APIs against their real contract (correct endpoints, ids, params); credentials from env. Do not fake responses.

## Owner controls

- Manage sticker catalog
- Access request logs for analytics/abuse monitoring

## Permissions & privacy

- Only Telegram user IDs and request timestamps are stored for analytics and abuse prevention

## Edge cases

- Empty sticker catalog
- Telegram sticker send limits requiring image fallback
- Invalid command parameters in future expansion

## Required tests

- Verify /sticker command returns valid sticker
- Confirm request logging works
- Test fallback to image when stickers are unavailable

## Assumptions

- Default /sticker command format
- Telegram sticker format priority
- Random selection from catalog as default behavior
