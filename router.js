module.exports = function (express, baza) {
  const router = express.Router()

  // POST ZAHTEV - insert upit
  router.post('/table/add', function (req, res, next) {
    console.log(req.body)
    baza.execQuery(`INSERT INTO polaznici(jmbg, ime, prezime, adresa) VALUES ('${req.body.jmbg}', '${req.body.ime}', '${req.body.prezime}', '${req.body.adresa}')`, function(results) {
      res.send(results)
    })
  })

  // router.post('/table/t1', function (req, res, next) {
  //   console.log('Telo requesta: ', req.body)
  //   console.log('Parametri requesta: ', req.params)
  //   res.send({
  //     p: 'SOME DATA - sent by PRVI POST',
  //     params: req.params,
  //     body: req.body
  //   })
  // })

  // GET ZAHTEV - select upit
  router.get('/table', function (req, res) {
    console.log('Parametar requesta: ' + req.query.parametar)
    baza.execQuery(`SELECT * FROM polaznici where prezime='${req.query.parametar}' OR jmbg='${req.query.parametar}'`, function(results){
      res.send(results)
    })
  })

  router.get('/table/list', function (req, res) {
    baza.execQuery(`SELECT * FROM polaznici`, function(results) {
      res.send(results)
    })
  })

  // DELETE ZAHTEV - delete upit
  router.delete('/table/remove/*', function (req, res) {
    console.log('Ispunjava delete zahtev, parametri: ' + req.params['0'] + ' jmbg: ' + req.body.jmbg)
    // Izgleda moze da se brise i bez body-a u requestu, preko parametra
    baza.execQuery(`DELETE FROM polaznici WHERE jmbg='${req.body.jmbg}'`, function(results) {
      res.send(results)
    })
  })

  return router
}