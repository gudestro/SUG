/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const userId = document.getElementById('userId')
const tableReports = document.getElementById('tableReports')
const scheduleId = document.getElementById('schedule')
const description = document.getElementById('description')
const confirm = document.getElementById('confirm')
const errorMessage = document.getElementById('errorMessage')
const informationModal = document.getElementById('informationModal')
const messageToModal = document.getElementById('message')
const messageToModalP = document.getElementById('messageP')

async function saveReport () {
  if (scheduleId.value === '0') {
    errorMessage.textContent = 'Você não tem relatórios pendentes.'
    errorMessage.style.display = 'block'
  } else if (description.value.length < 50 || !confirm.checked) {
    errorMessage.textContent = 'Preencha com todas as informações.'
    errorMessage.style.display = 'block'
  } else {
    errorMessage.style.display = 'none'
    const payload = {
      userId: parseInt(userId.value),
      scheduleId: parseInt(scheduleId.value),
      description: description.value,
      typeReport: 'final',
      isValided: false
    }

    const result = await axios.post('/report/saveReport', payload).then(result => (result))
      .then(result => {
        let message = 'Operação realizada com sucesso!'
        if (result.message) {
          message = result.message
        }
        messageToModalP.textContent = message
        messageToModalP.style.display = 'block'
        informationModal.style.display = 'block'
      })
      .catch(function (e) {
        console.log(e)
        messageToModal.textContent = e.response.data.message
        messageToModal.style.display = 'block'
        informationModal.style.display = 'block'
      })
  }
}

function reload () {
  window.location.href = '/meus-relatorios'
}

function concat (id) {
  const elementoA = document.getElementById(id)
  const elementoB = document.getElementById('description')

  if (elementoA && elementoB) {
    const valorElementoA = elementoA.textContent
    const valorElementoB = elementoB.value

    const novoValorB = valorElementoB + valorElementoA

    elementoB.value = novoValorB
  } else {
    console.error('Um ou ambos os elementos não foram encontrados.')
  }
}

async function completeReports () {
  try {
    tableReports.getElementsByTagName('tbody')[0].innerHTML = ''
    const id = parseInt(scheduleId.value)

    if (!id) {
      return
    }

    const response = await axios.post('/report/getReport', { id, option: 5 })
    const reports = JSON.parse(response.data)

    if (!Array.isArray(reports)) {
      console.error('Dados recebidos não são uma array', reports)
    }

    for (const report of reports) {
      if (report.typeReport !== 'mensalEngenheiro') { continue }
      const userResponse = await axios.post('/user/getUser', { value: report.userId, key: 'id' })
      const user = JSON.parse(userResponse.data)
      const tr = document.createElement('tr')
      const cel2 = document.createElement('td')
      const cel3 = document.createElement('td')
      cel3.textContent = user.name
      const cel4 = document.createElement('td')
      cel4.textContent = user.office

      const div = document.createElement('div')
      div.id = report.id
      div.textContent = report.description
      div.style.wordBreak = 'break-word'
      div.style.width = '248px'
      div.style.maxHeight = '200px'
      div.style.overflowY = 'scroll'
      div.style.whiteSpace = 'break-spaces'

      const cel5 = document.createElement('td')
      cel5.innerHTML = `<button onclick="concat(${report.id})" type="button" class="btn btn-outline-secondary btn-rounded btn-icon">
      <i class="ti-star text-primary"></i>
    </button>`

      cel2.appendChild(div)

      tr.appendChild(cel2)
      tr.appendChild(cel3)
      tr.appendChild(cel4)
      tr.appendChild(cel5)
      tableReports.getElementsByTagName('tbody')[0].appendChild(tr)
    }
  } catch (error) {
    console.log(error)
  }
}
