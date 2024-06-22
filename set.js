const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0dNYnB2Q1FTcnZJeFZHcWpMcnNnQi91d2RkeGl3eU5VRnIxcnVFWXQzND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM0FRYktDazRiRUNHSytiN0lMZWpYWDhnRVVYbHpwYUdFUlcrakV6MWtrTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5TkRmOC9Md3ZqMTRsVkJmYnpNbHZEKy81a3VsVEZIdEF0ckhZckQ2QTJnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWa1hoQ0N0VTJ6Z1lqa1VTdnN6SWNVL1dYOTQrMFRkdnFXUkVTcDB6NVRJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFPWFJzTDNzaGZ1U29SeFo4Lzd3K1pldFRiMkhTVjdZb3AxaE40RVpxMHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkN1c3JrckhwbXJ2TlQzUVVHVnprQnptRlhMbGlCYzVScHZ0Z01CMHhrSEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0UzcU5yNUlkWUVBUXhlRlRHc0pyTkR5alZQN3VRamlOVUF0amNiMjBsQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRFZzMUhUV3p0K2FWdXArU3B3dUQwZGx6WjdaR0hmWk1MQ3NZbDZabGhscz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllSUjNvZkxlTHc5YStrQ3BlTXFCWS96SjA3MWJpTzUvaXIyWWhKRHdCU2lVQTBwU1lDNStodnFmQ215bS8ySkh6WTFZeDZHVHRaeVJZY3Y4NUMwOWhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMzLCJhZHZTZWNyZXRLZXkiOiJXR1ZZbGJ5NlNqY2tDZ29QTGNxTk1nejJRb0p3UmhCWWRIOFZKdVI3bTUwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI3NjI4ODUzMjgxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjA0QjA5OEI0MUY0NzQ3NTc0RUYwN0Y5NDRBMkY2Rjg1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTkwNTkwNjZ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Im1Helh6a3ZUVFY2U1NHcnBNd2dTbGciLCJwaG9uZUlkIjoiNTExNzNhOTktYjQ5OS00NGY1LWExMWItYzk0YjhjNzYyMjQ4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Img0R2krcW5iYWJvMTFNN2ZhNnQ2UzlCbWRZbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3REdGZVN0TXFjcDV3Tmx1QnhJWi9YMGthTWM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSFhRU0E5OVYiLCJtZSI6eyJpZCI6IjI3NjI4ODUzMjgxOjMxQHMud2hhdHNhcHAubmV0IiwibmFtZSI6InByaW5jZW1hc2hhbWJhMDkifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BUZzlJSUhFT2lFMjdNR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InhvczlqcENnZEJJU0hPWUZRQkFxSjlYZTlYR01JcFloRzhRalVQR3RyblU9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkEzOU43UzFrbEVOQXFQNnlBUlZIOXNFS3VCUFhRdStsV1dFYThvMm5aN3h2RFpPS0RXZHkxd1ZXNUMvc3QrSUhuSDNLd3dmbnVDdnNaNUJoNzVWa0R3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJFVzIxYWo5MDFWYmhPbTB3V2t5VzZ5aXh5RjRVd1N3d3FLTjJmcWhSQUJlZWZnaHViTGRFNHNXL1RSUVJEcXlXcGVxbnd3L2d5a0F0ak54QXE0eGdpUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI3NjI4ODUzMjgxOjMxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmNhTFBZNlFvSFFTRWh6bUJVQVFLaWZWM3ZWeGpDS1dJUnZFSTFEeHJhNTEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTkwNTkwNjEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBS1VUIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Keith Keizzah",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "27628853281",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'HUNCHO MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e18441d126f37be8efbfa.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
