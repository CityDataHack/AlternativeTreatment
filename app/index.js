const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/templates')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))


// route handler
app.get('/', (request, response) => {
  response.render('home', {
    name: 'City Data Hack 2018'
  })
})

app.listen(8080);