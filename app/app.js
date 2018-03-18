const apiai = require('apiai')
const exphbs = require('express-handlebars')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
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


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(express.static('static'))

app.use('/api', apiRouter)

io.on('connection', socketHandler.onConnection)

// route handler
// index
app.get('/', (request, response) => {
  response.render('home', {
    title: 'Spirit of the Place'
  })
})

// bot
app.get('/bot', (request, response) => {
  response.render('bot', {
    title: 'Bot - Spirit of the Place'
  })
})

// board
app.get('/board', (request, response) => {
  response.render('board', {
    title: 'Board - Spirit of the Place'
  })
})

// demo
app.get('/demo', (request, response) => {
  response.render('demo', {
    title: 'Demo - Spirit of the Place'
  })
})

// app.listen(app.get('port'))
http.listen(process.env.PORT);
