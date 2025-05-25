const { Client } = require('discord.js-selfbot-v13');
const client = new Client();
const translatte = require('translatte');
require('dotenv').config()

const PREFIX = '';

let afk = false;

const kao = {
    "smile": "(≧◡≦)",
    "happy": "o(≧▽≦)o",
    "proud": "<(￣︶￣)>",
    "yay": "＼(≧▽≦)／",
    "heart": "♡",
    "embarrassed": "(⁄ ⁄•⁄ω⁄•⁄ ⁄)",
    "meh": "(￣︿￣)",
    "scream": "(ᗒᗣᗕ)՞",
    "angy": " 	ヽ( `д´*)ノ",
    "cry": "(╥﹏╥)",
    "sob": "(╥﹏╥)",
    "scared": "..・ヾ(。＞＜)シ",
    "d-_-b": "┐(￣ヘ￣)┌",
    "shrug": "┐(￣ヘ￣)┌",
    "confused": "(・・ ) ?",
    "?": "(・・ ) ?",
    "surprised": "Σ(°ロ°)",
    "wow": "w(°ｏ°)w",
    "hi": "(￣▽￣)ノ",
    "hello": "＼(⌒▽⌒)",
    "hey": "(^０^)ノ",
    "hug": "(つ≧▽≦)つ",
    "kiss": "(づ￣ ³￣)づ",
    "wink": "☆(>ᴗ•)",
    "peek": "|･ω･)",
    "sleep": "(￣o￣) zzZZzzZZ",
    "wizard": "(ﾉ>ω<)ﾉ :｡･:*:･ﾟ’★,｡･:*:･ﾟ’☆",
    "magic": "(ﾉ>ω<)ﾉ :｡･:*:･ﾟ’★,｡･:*:･ﾟ’☆",
    "salut": "(￣^￣)ゞ",
    "salute": "(￣^￣)ゞ",
    "wake": "٩(ˊ〇ˋ*)و",
}

const eightball = ["yes", "no", "absolutely", "absolutely not", "never", "always", "maybe", "not now", "probably", "probably not", "sure"]

const commands = [
    "kao",
    "ping",
    "eightball",
    "translate",
    "afk"
]

client.on('ready', async () => {
    console.clear()
    console.log("   _____       _   _        ");
    console.log("  / ____|     | | (_)       ");
    console.log(" | (___   ___ | |_ _  __ _  ");
    console.log("  \\___ \\ / _ \\| __| |/ _` | ");
    console.log("  ____) | (_) | |_| | (_| | ");
    console.log(" |_____/ \\___/ \\__|_|\\__,_| ");
    console.log("                            ");
    console.log(`Logged in as: ${client.user.username.normalize()}`);
})

client.on('messageCreate', async (message) => {
    if (message.content.includes('<@1181171123493273601>')) {
        if (afk) {
            message.channel.send('Hey!, My Status Is Currently Set to AFK! Please Do Not Disturb Me! ٩(ˊ〇ˋ*)و');
        }
    }

    if (message.author.id === '1181171123493273601' && afk && message.content !== 'Mode AFK Enabled!') {
        message.channel.send('Mode AFK Disabled!');
        afk = false;
    }

    if (!message.content.startsWith(PREFIX) || message.author.id !== '1181171123493273601') return;
    if (!commands.includes(message.content.split(' ')[0].toLowerCase().slice(PREFIX.length))) return;
    const cmd = message.content.split(' ')[0].toLowerCase().slice(PREFIX.length);
    const args = message.content.split(' ').slice(1);

    message.delete();

    if (cmd === 'ping') {
        message.channel.send(`🏓 Pong! ${Date.now() - message.createdTimestamp}ms`);
    }

    if (cmd === 'kao') {
        message.channel.send(`${args.slice(1).join(' ')} ${kao[`${args[0]}`]}`);
    }

    if (cmd === 'eightball') {
        message.channel.send(eightball[Math.floor(Math.random() * eightball.length)]);
    }

    if (cmd === 'translate') {
        translatte(args.slice(1).join(' '), {to: args[0]}).then(res => {
            message.channel.send(res.text);
        });
    }

    if (cmd === 'afk') {
        afk = !afk;
        if (afk) {
            message.channel.send('Mode AFK Enabled!');
        } else {
            message.channel.send('Mode AFK Disabled!');
        }
    }


})

client.login(process.env.TOKEN);