const express = require('express')

var router = express.Router()


function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2]));
}

function parseISOStringDateTime(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4]));
}

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

router.get('/test', function(req, res){
    res.json({'test': 1, 'test2': 'test'})
})

var events = [
    {name: "Choir concert", time: parseISOStringDateTime("2018-03-19T19:00"), address: "St. Mark's Church Barking & Dagenham"},
    {name: "Farmer's market", time: parseISOStringDateTime("2018-03-20T12:00"), address: "Square in front of Town Hall"},
    {name: "Farmer's market - second day", time: parseISOStringDateTime("2018-03-21T12:00"), address: "Square in front of Town Hall"}
    
]

var board = [
    {
        text: "Everyone is invited to flat B for an apple pie Tuesday evening!"
    }
]

function getEvents(start_date, end_date) {
    return events.filter(x => start_date <= x.time && x.time < end_date)
}


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

function getEventResponse(params) {

    var start_date, end_date

    if(params.datePeriod) {
        elements = params.datePeriod.split('/')
        start_date = parseISOString(elements[0])
        end_date = parseISOString(elements[1])
        end_date = end_date.addDays(1)
    } else if (params.date) {
        start_date = parseISOString(params.date)
        end_date = start_date.addDays(1)
    }

    console.log({start_date: start_date, end_date: end_date})
    console.log(events)

    var chosen_events = getEvents(start_date, end_date)

    var message

    if(chosen_events.length) {
        message = 'There are some events in the area'
    } else {
        message = 'It seems there are no events in the area'
    }

    return {
        speech: message,
        displayText: message,
        data: {
            events: chosen_events
        },

    }
}

router.post('/ai', function(req, res){

    console.log(req.body)
    if(req.body.result.action == 'search-event'){
        return res.json(getEventResponse(req.body.result.parameters))
    }

    return res.json({error:true})
})


module.exports = router