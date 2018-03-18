const apiai = require('apiai')
const exphbs = require('express-handlebars')
const express = require('express')
const path = require('path')
require('dotenv').config({ path: 'variables.env' });

const apiRouter = require('./apiRouter.js')
const socketHandler = require('./socketHandler.js')

// Express server
const app = express()

const http = require('http').Server(app)
const io = require('socket.io')(http)

app.engine('.hbs', exphbs({
  defaultLayout: 'default',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/templates')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
app.set('port', process.env.PORT || 8080);

app.use(express.static('static'))

app.use('/api', apiRouter)

io.on('connection', socketHandler.onConnection)

// route handler
// index
app.get('/', (request, response) => {
  response.render('home', {
    name: 'City Data Hack 2018'
  })
})

// bot
app.get('/bot', (request, response) => {
  response.render('bot', {
    name: 'City Data Hack 2018'
  })
})

// board
app.get('/board', (request, response) => {
  response.render('board', {
    name: 'City Data Hack 2018'
  })
})

// iframe
app.get('/iframe', (request, response) => {
  response.render('iframe', {
    name: 'Iframe backup'
  })
})

// app.listen(app.get('port'))
http.listen(process.env.PORT);
