const qrcode = require('qrcode-terminal');
const Spotify = require('spotify-web-api-js');
const spotifyApi = new Spotify();
const Hmtai = require('hmtai');
const hmtai = new Hmtai();
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    const message = msg.body.split(' ')
    const cmd = message[0]
    const removedCmdFromMsg = message.shift()
    const args = message

    if(cmd === '!ping'){
        msg.reply('pong!')
    }

    if(msg.body === '!w'){
        const media = await MessageMedia.fromUrl('https://i.redd.it/w33xxd8fx2k91.jpg')
        msg.reply(media)
    }

    if(msg.fromMe){
        if(msg.body === '!t'){
            msg.reply('test')
        }
    }

    if(cmd === '!pass'){
        msg.reply(`Randomly generated password for you:- ${randomPass()}`)
    }

    if(cmd === '!hentai'){
        let url = await hmtai.nsfw.hentai()
        const media = await MessageMedia.fromUrl(url)
        msg.reply(media)
    }

    // if(cmd === '!spotify'){
    //     getSong()
    // }

})

const randomPass = () =>{
    let characters = "!@#$%^&*()_+abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    let length = 14
    let pass = ''
    for(i = 0; i < length; i++){
        pass += characters[Math.floor(Math.random() * characters.length)]
    }

    return pass
}

const getSong = (name) =>{
    spotifyApi.searchTracks('hum', {limit: 5})
    .then((data) =>{
        console.log(data)
    }, err => console.log(err))
}

client.initialize();
 