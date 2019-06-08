const baza = require('./sql-funkcije')
mysql = require('mysql')

const dbData = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'mala_skola_programiranja',
  connectionLimit: 10,
  debug: false
}

const upit = `SELECT * FROM polaznici`

baza.createPool(dbData)
baza.execQuery(upit, function(results){
  console.log(results)
})