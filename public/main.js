let test = ''
const s = (selektor) => document.getElementById(selektor)

const reqBody = {
  p1: 'Hello',
  p2: 'World!'
}

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(reqBody)
}

// POST REQUEST
fetch('/table/t1', options)
  .then(results => results.json())
  .then(results => {
    // results = JSON.stringify(results)
    document.getElementById('test').innerHTML = `Poruka: ${results.body.p1} ${results.body.p2}`
    // document.getElementById('test').innerHTML = results
  })

// GET REQUEST
// const broj1 = 5
// const broj2 = 10
// document.getElementById('test2').innerHTML += `Sabiramo brojeve ${broj1} i ${broj2}<br>`
// fetch(`/table/?a=${broj1}&b=${broj2}`)
//   .then(res => res.json())
//   .then(res => {
//     document.getElementById('test2').innerHTML += JSON.stringify(res)
//   })

s('searchPrezime').addEventListener('click', function(){
  const prezime = s('prezime').value
  fetch(`/table/?prezime=${prezime}`)
  .then(res => res.json())
  .then(res => {
    // document.getElementById('test2').innerHTML = JSON.stringify(res)
    document.getElementById('test2').innerHTML = `
      JMBG: ${res[0].jmbg}<br>
      Ime: ${res[0].ime}<br>
      Prezime: ${res[0].prezime}<br>
      Adresa: ${res[0].adresa}<br>
    `
  })
})

s('searchJmbg').addEventListener('click', function(){
  const prezime = s('jmbg').value
  fetch(`/table/?prezime=${prezime}`)
  .then(res => res.json())
  .then(res => {
    // document.getElementById('test2').innerHTML = JSON.stringify(res)
    document.getElementById('test2').innerHTML = `
      JMBG: ${res[0].jmbg}<br>
      Ime: ${res[0].ime}<br>
      Prezime: ${res[0].prezime}<br>
      Adresa: ${res[0].adresa}<br>
    `
  })
})

