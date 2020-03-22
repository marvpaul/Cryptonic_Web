var express = require('express')
var bodyParser = require('body-parser')
var mongo = require('mongoose')
var cors = require('cors')

let connectionString = ''
if (process.env.connectionString == null || process.env.connectionString == '') {
  var fs = require('fs')
  var config = JSON.parse(fs.readFileSync('server/config.json'))
  connectionString = config.connectionString
} else {
  connectionString = process.env.connectionString
}

mongo.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Connected to mongo db')
  }
})

var app = express()
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

var MessagesSchema = new mongo.Schema({
  message: String,
  expirationTimestamp: Number
})
var Message = mongo.model('Message', MessagesSchema)

/**
 * Endpoint for posting new messages into the database.
 */
app.post('/api/message', function (req, res) {
  var mod = new Message(req.body)
  console.log(mod)
  mod.save(function (err, data) {
    if (err) {
      res.status(404).send(err)
    } else {
      res.send({ data: data.id })
    }
  })
})

/**
 * Endpoint for deleting a message given a certrain id.
 */
app.delete('/api/message/:id', function (req, res) {
  Message.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      res.status(404).send(err)
    } else {
      console.log('Deleted message: ' + req.params.id)
      res.send({ data: 'Deleted' })
    }
  })
})

/**
 * Get endpoint for a message. In case the _id which is send by client exists in database,
 * the message is loaded from database. In case the message is expired or no message with a certain id exists,
 * null is returned. Otherwhise the encrypted message object is returned.
 */
app.get('/api/message/:id', function (req, res) {
  var id = req.params.id
  console.log('Search for: ', id)
  Message.findById(id, function (err, data) {
    if (err || data === null) {
      console.log('Message not found')
      res.sendStatus(404)
    } else {
      Message.deleteOne({ _id: id }, function (err) {
        if (!err) {
          console.log('Deleted message: ' + id)
        } else {
          console.log(err)
        }
      })
      const now = new Date().getTime()
      if (data.expirationTimestamp != null && data.expirationTimestamp < now) {
        res.sendStatus(410) // HTTP/1.1 Gone
      } else {
        res.send(data)
      }
    }
  })
})

module.exports = app
