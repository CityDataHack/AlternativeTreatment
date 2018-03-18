const apiai = require('apiai')

const bot = apiai(process.env.DIALOGFLOW_KEY);

var users = {}

exports.onConnection = function(socket){
    console.log('Anonymous user connected')

    socket.on('join', function(name){
        users[socket.id] = name
        console.log(`User ${name} joined`)
    })

    socket.on('message', function(message){
        var botRequest = bot.textRequest(message, {
            sessionId: `dev-session-${socket.id}`
        })

        botRequest.on('response', function(response){
            socket.emit('reply', response)
        })

        botRequest.on('error', function(error){
            console.log(error)
            socket.emit('error', {
                type: 'error',
                content: 'There was a problem with processing your message'
            })
        })

        botRequest.end()
    })

    socket.on('disconnect', function(){
        delete users[socket.id]
    })
}