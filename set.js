const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Gifted;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUR6bVBvblNUZ3doRFd4b0ZjTVFsdHBVT2VCZDBIRDIxUWUrOGt5ZmlGaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT01wOUVMRUtCUWFNYXFCNWhJU0ZZY3ZhdTdyOFVRNUhxeVcxUVhPRWhGYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxRjdrajB6MlVJYUhSNmxFU2l6WkxzcTFKRWlXaXl6azRUTzlxWFo1RTFZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYS0U5cXlmbDlKb0I4VjB3cUtLNkw5RzJRQWhiZ3RmRXByKzVKL3V4Q1JFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFDaUhhcjZrdFZUV2srVDlpV0k1RkFEajAwMHhSZWlMNHBrQmF3R1lPRVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlYyTmlLRk5sUlZSRE1iRklZWC9KVWM1RjdqZy8xQmpkZ2NRdml6UEltSFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUdhZTVqUUZSV21KQTR5bzZtSjY1TUJDVEFyMDJCc2ExSzlrMHU4NmhGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic2JUUFlSVFdPdGIvYlBPNVdlVVVTWU1vaGtGWXZRb1BaVTc1c3AxZlRYQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpkeC8xbUJuSEZIbXFWZWhXK1BES0hIVk9YZjc4aWFGSlhCMHJuNUx0OUJhR1JWczVtYTRLRTh5eTBmV2RZRUQxNVc4MU83WnkyYmpzV1pvNld2TGlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgsImFkdlNlY3JldEtleSI6IkF6NnVOcjlCNTc5QXY4VnBpOFZVM1FMck5uVFYwS3l4c0E0elBxT2NuZDA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODA3ODExMjg5MUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQUEwNDZBOUY3Rjc0REQ3MzgzOCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE5NTMzODAxfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJfQ2pXT2V6ZFFCaXFzRUJxQTFHREF3IiwicGhvbmVJZCI6IjVlYzkxYmE4LTJiNzEtNDk5NS04ZDBjLTkxYWNhY2ZmNWQyMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3NzJaNzJwang5S0VrZnFYMW55b2MwVTdjTkU9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkV4U2UrU3M1WDJMWXFjMENXRjc3N2kwNmtRMD0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BldmdQY05FT1dCK0xNR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im1MeGsyOGlkWHVyTEs1ZUJnRTQ2SS9PZXFTUjdmOVdRZ1hnMjRudGEwRFE9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ilc3YlppZXV2SS8reFBidjE4ZGVudTJSSWZOWnhkQlBjTGd1azRQaWFza1pHakp2cDZWNXNuODFSSGhDaXpNNXZRNE5GRGRDMWVXVkVaczVYL2hDYkFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJDeDJpanZVSTFuVUVGcWxYTmVyVjg5WVowcUxoS2RDTmpKaXRMZjBSeXhQdkxQWVY0amM5WmhhZFZOcW5JYncyYnFmU2ZVKzBNcmc3dmtUb3FLZ3VnUT09In0sIm1lIjp7ImlkIjoiMjM0ODA3ODExMjg5MTo0MUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJDYWVzYXIifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODA3ODExMjg5MTo0MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaaThaTnZJblY3cXl5dVhnWUJPT2lQem5xa2tlMy9Wa0lGNE51SjdXdEEwIn19XSwicGxhdGZvcm0iOiJzbWJpIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE5NTMzNzk5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxNdiJ9',
    PREFIXE: process.env.PREFIX || "!",
    OWNER_NAME: process.env.OWNER_NAME || "C̶a̶e̶s̶a̶r̶-̶M̶d̶",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2348078112891", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
CHATBOT: process.env.CHAT_BOT || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'ɢɪғᴛᴇᴅ-ᴍᴅ',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0b57c4c97dfca87bce76c.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    PRESENCE : process.env.PRESENCE || 'online',
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




