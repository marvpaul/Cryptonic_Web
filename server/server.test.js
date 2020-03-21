const app = require('./server')
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require('mongoose')
const CryptoJS = require('crypto-js/crypto-js')

it('post encrypted message and read it', async (done) => {
  // Post message
  const salt = CryptoJS.lib.WordArray.random(128 / 8)
  const key = String(CryptoJS.PBKDF2(Math.random().toString(), salt, { keySize: 512 / 32, iterations: 1000 }))
  var cryptedText = String(CryptoJS.AES.encrypt('Test message', key))
  var response = await request
    .post('/api/message')
    .send({ message: cryptedText, expirationTimestamp: null })
  expect(response.status).toBe(200)
  const messageId = response.body.data

  // Get message
  response = await request
    .get('/api/message/' + messageId)
  expect(response.status).toBe(200)
  const encryptedMessage = response.body.message
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, key)
  const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8)

  expect(decryptedMessage).toBe('Test message')

  // Get same message again, should be gone
  response = await request
    .get('/api/message/' + messageId)
  expect(response.status).toBe(404)

  await mongoose.connection.close()
  done()
})
