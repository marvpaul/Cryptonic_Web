var app = require('./server')
app.listen(process.env.PORT || 8080, function () {
  if (process.env.port != null) {
    console.log('Server listen to ' + process.env.port)
  } else {
    console.log('Server listen to ' + 8080)
  }
})
