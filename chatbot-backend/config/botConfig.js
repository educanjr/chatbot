require('dotenv').config();

module.exports = {
    platformURL: process.env.BOT_PLATFORM_URL,
    apiTimezone: process.env.BOT_API_TIMEZONE,
    defaultResult: process.env.BOT_DEFAULT_RESULT
}