require('dotenv').config()
const fs = require('fs')
const https = require('https')
const http = require('http')
const app = require('./app')
const mailModel = require('./mail')

const port = process.env.PORT || 3000
// http.createServer(app).listen(port)
// console.log('server running on port: ' + port)
var privateKey = fs.readFileSync('/etc/letsencrypt/live/cscloud482.lnu.se/privkey.pem', 'utf8')
var certificate = fs.readFileSync('/etc/letsencrypt/live/cscloud482.lnu.se/cert.pem', 'utf8')
var chain = fs.readFileSync('/etc/letsencrypt/live/cscloud482.lnu.se/chain.pem', 'utf8')
// - Congratulations! Your certificate and chain have been saved at:
// /etc/letsencrypt/live/cscloud482.lnu.se/fullchain.pem
// Your key file has been saved at:
// /etc/letsencrypt/live/cscloud482.lnu.se/privkey.pem

https.createServer({
  key: privateKey,
  cert: certificate
}, app).listen(port)
