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

  // bots response
  console.log(res)


  var intent = res.result.metadata.intentName
  var meeting = 'Set up a meeting'
  var addon = document.getElementById('addon')


  if(intent == meeting) {
    addon.classList.remove('hidden')
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