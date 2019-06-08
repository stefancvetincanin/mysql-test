const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// postavljanje default path-a za aplikaciju
app.use(express.static(path.join(__dirname, 'public')))

// aplikacija osluskuje na portu koji se prosledi
app.listen(port, () => {
  console.log('Server radi na portu: ' + port)
})

const dbData = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'mala_skola_programiranja',
  connectionLimit: 10,
  debug: false
}

mysql = require('mysql')

const baza = require('./sql-funkcije')
baza.createPool(dbData)

const routes = require('./router.js')(express, baza)
app.use(routes)