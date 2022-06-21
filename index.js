const { Client, LocalAuth } = require('whatsapp-web.js')
const { CronJob } = require('cron')
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { executablePath: '/usr/bin/chromium-browser', args: ['--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote'] }
})
const qrcode = require('qrcode-terminal')

client.on('qr', qr => {
    console.log('Escaneie o código QR para iniciar a sessão.')
    qrcode.generate(qr, { small: true })
})

client.on('ready', async () => {
    console.log('Cliente WhatsApp Web Online!')

    let text = ""
    let mentions = []
    const grupo = '120363024284020371@g.us'

    const chat = await client.getChatById(grupo)

    for(let participant of chat.participants) {
        const contact = await client.getContactById(participant.id._serialized);
        
        mentions.push(contact);
        text += `@${participant.id.user} `;
    }

    const horas = new CronJob('00 00 09,12,13,16 * * 1-5',
        chat.sendMessage(
            `⚠️ *Hora do Ponto, pessoal!*\n\n➡️ Acesse o site para clicar: https://app2.pontomais.com.br/registrar-ponto\n${text}`,
            {mentions}
        )
    )
    horas.start()
})

client.initialize()