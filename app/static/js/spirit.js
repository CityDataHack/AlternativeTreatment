var botui = new BotUI('hello-world');
var socket = io()

var getUserInput = function() {

  return botui.action.text({
    delay: 500,
    action: {
      placeholder: 'Hi Spirit, what events are there in the area today?'
    }
  }).then( function(inp) {
    io.emit('message', inp)
  })
}

socket.on('reply', function(res){
  botui.message.bot({
    delay: 1000,
    content: res.content
  })
  if(res.type != 'exit'){
    return getUserInput()
  }
})

socket.on('error', function(err){
  botui.message.bot({
    delay: 1000,
    content: res.content
  })
})

getUserInput()