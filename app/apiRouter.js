const express = require('express')

var router = express.Router()

router.get('/test', function(req, res){
    res.json({'test': 1, 'test2': 'test'})
})

var events = [
    {name: "Choir concert", start_time: "2018-03-19T19:00", address: "St. Mark's Church Barking & Dagenham"},
    {name: "Farmer's market", start_time: "2018-03-20T12:00", end_time: "2018-03-20T16:00", address: "Square in front of Town Hall"}
]

var board = [
    {
        text: "Everyone is invited to flat B for an apple pie Tuesday evening!"
    }
]

router.get('/events', function(req, res){

    res.json(events)
})

router.get('/board', function(req,res){
    res.json(board)
})

router.post('/board', function(req, res){

    var message = {
        text: req.IDONTKNOW
    }

    board.push(message)
})


module.exports = router