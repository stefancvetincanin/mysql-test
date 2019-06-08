module.exports = function (express, baza) {
  const router = express.Router()

  // POST ZAHTEV
  router.post('/table/*', function (req, res, next) {
    console.log('Telo requesta: ', req.body)
    console.log('Parametri requesta: ', req.params)
    res.send({
      p: 'SOME DATA - sent by POST response',
      params: req.params,
      body: req.body
    })
  })

  // GET ZAHTEV
  router.get('/table', function (req, res, next) {
    console.log('Upit requesta: ' + req.query.prezime)
    baza.execQuery(`SELECT * FROM polaznici where prezime='${req.query.prezime}' OR jmbg='${req.query.prezime}'`, function(results){
      res.send(results)
      console.log(results)
    })
  })
  return router
}