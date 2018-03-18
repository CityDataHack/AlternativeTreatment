var botui = new BotUI('hello-world');
var socket = io.connect('http://localhost:8080');

var getUserInput = function() {

  return botui.action.text({
    delay: 500,
    action: {
      placeholder: 'Hi Spirit, what events are there in the area today?'
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