/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const userId = document.getElementById('userId')
const scheduleId = document.getElementById('schedule')
const description = document.getElementById('description')
const confirm = document.getElementById('confirm')
const errorMessage = document.getElementById('errorMessage')
const informationModal = document.getElementById('informationModal')
const messageToModal = document.getElementById('message')
const messageToModalP = document.getElementById('messageP')
const tableReports = document.getElementById('tableReports')

async function saveReport (office) {
  const trs = tableReports?.getElementsByTagName('tbody')[0]?.getElementsByTagName('tr') ?? []
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
      typeReport: office === 'Engenheiro' ? 'mensalEngenheiro' : 'mensal',
      isValided: false
    }

    await axios.post('/report/saveReport', payload).then(result => (result))
      .then(result => {
        let message = 'Operação realizada com sucesso!'
        if (result.message) {
          message = result.message
        }
        messageToModalP.textContent = message
        messageToModalP.style.display = 'block'
        informationModal.style.display = 'block'

        if (trs.length) {
          for (const tr of trs) {
            const id = parseInt(tr.getElementsByTagName('td')[0].textContent)
            const isValid = document.getElementById(`approved${id}`)?.checked
            if (isValid) {
              axios.post('/report/validateReport', { id: id }).then(result => (result))
            }
          }
        }
      })
      .catch(function (e) {
        console.log(messageToModal)
        messageToModal.textContent = 'Erro interno, tentar novamente.'
        messageToModal.style.display = 'block'
        informationModal.style.display = 'block'
      })
  }
}

function reload () {
  window.location.href = '/meus-relatorios'
}

async function completeReports () {
  try {
    const id = parseInt(scheduleId.value)

    if (!id) {
      return
    }

    const schedule = JSON.parse((await axios.post('/schedule/getSchedule', { id, option: 3 })).data)[0]
    tableReports.getElementsByTagName('tbody')[0].innerHTML = ''
    const response = await axios.post('/report/getReport', { id: schedule.constructionId, option: 5 })
    const reports = JSON.parse(response.data)

    if (!Array.isArray(reports)) {
      console.error('Dados recebidos não são uma array', reports)
    }

    for (const report of reports) {
      if (report.isValided) { continue }
      if (report.typeReport === 'mensalEngenheiro') { continue }
      const userResponse = await axios.post('/user/getUser', { value: report.userId, key: 'id' })
      const user = JSON.parse(userResponse.data)
      const tr = document.createElement('tr')
      const cel1 = document.createElement('td')
      cel1.textContent = report.id
      const cel2 = document.createElement('td')
      const cel3 = document.createElement('td')
      cel3.textContent = user.name
      const cel4 = document.createElement('td')
      cel4.textContent = user.office
      const cel5 = document.createElement('td')
      cel5.innerHTML = `<div class="form-check form-check-flat form-check-primary"><label class="form-check-label" for="admin">Aprovado<input class="form-check-input" type="checkbox" id="approved${report.id}" name="approved"=""><i class="input-helper"></i></label></div>`

      const div = document.createElement('div')
      div.textContent = report.description
      div.style.wordBreak = 'break-word'
      div.style.width = '248px'
      div.style.maxHeight = '200px'
      div.style.overflowY = 'scroll'
      div.style.whiteSpace = 'break-spaces'
      cel1.style.display = 'none'
      cel2.appendChild(div)

      tr.appendChild(cel1)
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
