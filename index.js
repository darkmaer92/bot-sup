const TelegramApi = require('node-telegram-bot-api')

const token = '1922525798:AAEFW5QCmQDC0GYJaDx_tVf6myQr3iLPJBQ'

const bot = new TelegramApi(token, {polling:true})


const buttonsSelect = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Ask Question', callback_data:'ask_q'},{text: 'Request a call', callback_data:'req_call'},{text: 'FAQ', callback_data:'faq'}],
        ]
    })
}

const start = () => {
    bot.setMyCommands( [
        {command:'/start', description: 'Start working!'},
        {command:'/info', description: 'info'},
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text == '/start') {
           return bot.sendMessage(chatId, `Hello, ${msg.from.last_name} ${msg.from.last_name} I am your telegram bot. I am here to help you with your problems`, buttonsSelect)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `bla bla bla go to our web site`,)
        }
        console.log(msg.text)
        return bot.sendMessage(chatId, `Your msg ${msg.text}`)
        

    })
        bot.on('callback_query', msg => {
            const data = msg.data;
            const chatId = msg.message.chat.id;
            if (data === 'ask_q') {
                return bot.sendMessage(chatId, 'Ask your question')
            }
            if (data === 'req_call') {
                return bot.sendMessage(chatId, 'Enter your phone number') 
            }
            if (data === 'faq') {
                return bot.sendMessage(chatId, 'choose a category') 
            }
            
        })
     
}

start()
