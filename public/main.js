let test = ''
const s = (selektor) => document.getElementById(selektor)

const reqBody = {
  p1: 'Hello',
  p2: 'World!'
}

const addUserData = {
  jmbg: '',
  ime: '',
  prezime: '',
  adresa: ''
}

const optionsPost1 = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(reqBody)
}

// POST REQUEST
// fetch('/table/t1', optionsPost1)
//   .then(results => results.json())
//   .then(results => {
//     // results = JSON.stringify(results)
//     console.log(results)
//     document.getElementById('test').innerHTML = `Poruka: ${results.body.p1} ${results.body.p2}`
//     // document.getElementById('test').innerHTML = results
//   })
getUsers()

// Dodavanje korisnika
s('post-forma').addEventListener('submit', e => {
  s('post-obavestenje').innerHTML = ''
  e.preventDefault()
  addUserData.jmbg = s('post-jmbg').value
  addUserData.ime = s('post-ime').value
  addUserData.prezime = s('post-prezime').value
  addUserData.adresa = s('post-adresa').value
  const optionsAddUser = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(addUserData)
  }
  fetch('/table/add', optionsAddUser)
    .then(res => res.json())
    .then(res => {
      if(res.affectedRows === 1)
        s('post-obavestenje').innerHTML = 'Podatak dodat u bazu'
      getUsers()
    })
})

// GET REQUEST
// Nabavljanje liste polaznika
function getUsers() {
  fetch('/table/list')
    .then(res => res.json())
    .then(res => {
      console.log(res)
      let polazniciDisplay = ''
      res.forEach(element => {
        polazniciDisplay += `
        <div class='polaznici'>
          JMBG: ${element.jmbg}<br>
          Ime: ${element.ime}<br>
          Prezime: ${element.prezime}<br>
          Adresa: ${element.adresa}<br>
        </div>
        `
      })
      s('polaznici-container').innerHTML = polazniciDisplay
    })
}

// Pretraga po bazi
s('searchPrezime').addEventListener('click', function(){
  const prezime = s('prezime').value
  fetch(`/table/?parametar=${prezime}`)
  .then(res => res.json())
  .then(res => {
    document.getElementById('test2').innerHTML = `
      JMBG: ${res[0].jmbg}<br>
      Ime: ${res[0].ime}<br>
      Prezime: ${res[0].prezime}<br>
      Adresa: ${res[0].adresa}<br>
    `
  })
})

s('searchJmbg').addEventListener('click', function(){
  const jmbg = s('jmbg').value
  fetch(`/table/?parametar=${jmbg}`)
  .then(res => res.json())
  .then(res => {
    document.getElementById('test2').innerHTML = `
      JMBG: ${res[0].jmbg}<br>
      Ime: ${res[0].ime}<br>
      Prezime: ${res[0].prezime}<br>
      Adresa: ${res[0].adresa}<br>
    `
  })
})

// BRISANJE KORISNIKA
s('delete-user-form').addEventListener('submit', (e) => {
  e.preventDefault()
  const removeUserData = {
    jmbg: s('delete-jmbg').value
  }
  const optionsRemoveUser = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(removeUserData)
  }
  console.log(optionsRemoveUser)
  fetch('/table/remove/kor1', optionsRemoveUser)
    .then(res => res.json())
    .then(res => {
      console.log('Rezultat brisanja:')
      console.log(res)
      getUsers()
    })
})

