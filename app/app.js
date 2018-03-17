const apiai = require('apiai')
const exphbs = require('express-handlebars')
const express = require('express')
const path = require('path')
require('dotenv').config({ path: 'variables.env' });

// Express server
const app = express()

app.engine('.hbs', exphbs({
  defaultLayout: 'default',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/templates')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
app.set('port', process.env.PORT || 8080);

app.use(express.static('static'))


// route handler
// index
app.get('/', (request, response) => {
  response.render('home', {
    name: 'City Data Hack 2018'
  })
})

// custom-bot
app.get('/iframe', (request, response) => {
  response.render('iframe', {
    name: 'Iframe backup'
  })
})

app.listen(app.get('port'))


// Dialogflow bot
const bot = apiai(process.env.DIALOGFLOW_KEY);

const botRequest = bot.textRequest('Where should I go?', {
  sessionId: 'dev-session'
});

botRequest.on('response', function(response) {
  console.log(response);
});

botRequest.on('error', function(error) {
  console.log(error);
});

botRequest.end();