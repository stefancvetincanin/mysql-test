const mysql = require('mysql')

// Pokretanje js fajla kroz cmd prompt: node filename

// Options file
const dbData = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'mala_skola_programiranja',
  connectionLimit: 10,
  debug: false
}

// Povezivanje preko poola
const pool = mysql.createPool(dbData)

const upit = `SELECT * FROM polaznici`

const upit2 = `SELECT * FROM (polaznici INNER JOIN polaznici_kursevi ON polaznici.jmbg = polaznici_kursevi.polaznici_jmbg) INNER JOIN kursevi ON kursevi.id = polaznici_kursevi.kursevi_id WHERE polaznici.ime = 'branko'`

const upit3 = `SELECT polaznici.jmbg, polaznici.ime, polaznici.prezime, kursevi.naziv, AVG(ocene.ocena) FROM ((polaznici INNER JOIN polaznici_kursevi ON polaznici.jmbg = polaznici_kursevi.polaznici_jmbg) INNER JOIN ocene ON ocene.polaznici_kursevi_id = polaznici_kursevi.id) INNER JOIN kursevi ON kursevi.id = polaznici_kursevi.kursevi_id GROUP BY polaznici.jmbg, polaznici_kursevi.id ORDER BY polaznici.prezime ASC`

pool.getConnection((err, connection) => {
  if(err) {
    console.log(err)
    return
  }
  connection.query(upit3, (err, results) => {
    if(err) return
    results.forEach(element => {
      console.log(element['AVG(ocene.ocena)'])
    });
    // console.log(results)
  })
})