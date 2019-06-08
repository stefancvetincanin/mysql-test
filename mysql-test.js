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

// Povezivanje na bazu
const connection = mysql.createConnection(dbData)

// PROVERA KONEKCIJE
// connection.connect(err => {
//   if (err) {
//     console.log('Greska! ' + err)
//     return
//   }
//   console.log('Connected!')
// })

// Prekid procesa
// process.exit(), ili Ctrl + C precica

let upit2 = `SELECT polaznici.jmbg, polaznici.ime, polaznici.prezime, kursevi.naziv, AVG(ocene.ocena) FROM ((polaznici INNER JOIN polaznici_kursevi ON polaznici.jmbg = polaznici_kursevi.polaznici_jmbg) INNER JOIN ocene ON ocene.polaznici_kursevi_id = polaznici_kursevi.id) INNER JOIN kursevi ON kursevi.id = polaznici_kursevi.kursevi_id GROUP BY polaznici.jmbg, polaznici_kursevi.id ORDER BY polaznici.prezime ASC`

let upit = `SELECT * FROM predavaci WHERE jmbg <> '1000000000000'`

// prvi nacin upita, samo prosledimo string upit
connection.query(upit, (err, results) => {
  if (err) 
    console.log('Greska u upitu!')
  else
    results.forEach(element => {
      console.log(`JMBG: ${element.jmbg}, Ime: ${element.ime}, Prezime: ${element.prezime}`)
    });
    // console.log(results[1])
  // process.exit()
})

// drugi nacin upita
connection.query(`SELECT * FROM kursevi WHERE id=${mysql.escape(1)}`, (err, results) => {
  if (err) 
    console.log('Greska u upitu!')
  else
    console.log(results)
})

// treci nacin, efektno isti kao drugi samo drugacije napisan
connection.query(`SELECT * FROM kursevi WHERE id=? OR naziv=?`, [2, 'programiranje'], (err, results) => {
  if (err) 
    console.log('Greska u upitu!')
  else
    console.log(results)
})

