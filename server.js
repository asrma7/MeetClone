const express = require('express');
const http = require('http');
const expressLayouts = require('express-ejs-layouts');
const { v4: uuidV4 } = require('uuid');
const Socket = require('socket.io');

const app = express()
const server = http.Server(app)
const io = Socket(server)

app.set('view engine', 'ejs')

app.use(expressLayouts)

app.set('layout', './layouts/root')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/newroom', (req, res) => {
    res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`)
})