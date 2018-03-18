var botui = new BotUI('hello-world');
var socket = io();

var getUserInput = function() {

  // user input
  return botui.action.text({
    delay: 500,
    action: {
      placeholder: 'Hi Spirit'
    }
  }).then( function(inp) {
    socket.emit('message', inp)
  })
}

socket.on('reply', function(res){

  var action = res.result.action
  var isEvent = "search-event"

  if (action === isEvent) {
    console.log('throw up events')
  }
  // bots response
  botui.message.bot({
    delay: 1000,
    content: res.result.fulfillment.speech
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