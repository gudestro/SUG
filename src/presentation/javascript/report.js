/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const id = document.getElementById('id')
const userId = document.getElementById('userId')
const allocationId = document.getElementById('allocationId')
const constructionId = document.getElementById('constructionId')
const scheduleId = document.getElementById('scheduleId')
const createdAt = document.getElementById('createdAt')
const user = document.getElementById('username')
const construction = document.getElementById('constructionId')
const allocation = document.getElementById('allocationSelect')
const description = document.getElementById('description')
const idDelete = document.getElementById('idDelete')
const nameDelete = document.getElementById('nameDelete')
const editModal = document.getElementById('editModal')
const deleteModal = document.getElementById('deleteModal')
const errorMessage = document.getElementById('errorMessage')
const errorMessageDelete = document.getElementById('errorMessageDelete')

const informationModal = document.getElementById('informationModal')
const messageToModal = document.getElementById('message')
const messageToModalP = document.getElementById('messageP')

async function completeAllocation () {
  try {
    const response = await axios.post('/construction/getConstructions', {})
    const constructions = JSON.parse(response.data)

    const response2 = await axios.post('/allocation/getAllocations', {})
    const allocations = JSON.parse(response2.data)

    if (!Array.isArray(constructions)) {
      console.error('Dados recebidos não são uma array', constructions)
      return
    }

    const auxA = allocations.filter(x => x.id === parseInt(allocation.value))[0]

    const constructionsToUser = constructions.filter(x => x?.id === auxA.constructionId)[0]

    construction.value = constructionsToUser.id
  } catch (error) {
  }
}

async function completeSelect () {
  allocation.innerHTML = ''
  try {
    const response = await axios.post('/allocation/getAllocations', {})
    const allocations = JSON.parse(response.data)

    if (!Array.isArray(allocations)) {
      console.error('Dados recebidos não são uma array', allocations)
      return
    }
    const res = await axios.post('/construction/getConstructions', {})
    const constructions = JSON.parse(res.data)

    const allocationToUser = allocations
      .filter(x => x?.userId === parseInt(user.value))
      .map(a => ({ ...a, nameConstruction: constructions.filter(c => c?.id === a.constructionId)[0]?.name }))

    allocationToUser.forEach(c => {
      const option = document.createElement('option')
      option.text = `${c.createdAt.split('T')[0]} - ${c.nameConstruction}`
      option.value = c.id
      allocation.appendChild(option)
    })
  } catch (error) {
    console.error('Erro ao completar alocação:', error)
  }
}

function openModal (schedule) {
  allocation.innerHTML = ''
  if (!schedule) {
    construction.value = 0
    allocation.value = 0
    description.value = ''
    status.value = 0
    completeSelect()
  } else {
    id.value = schedule.id
    createdAt.value = schedule.createdAt
    user.value = schedule.user.name
    userId.value = schedule.userId
    scheduleId.value = schedule.scheduleId
    allocationId.value = schedule.allocationId
    constructionId.value = schedule.constructionId
    construction.value = schedule.constructionId
    allocation.value = schedule.construction.name
    description.value = schedule.description
  }
  editModal.style.display = 'block'
}

function requestModal () {
  let message = 'Sua operação foi concluída com sucesso'

  const payload = {
    userId: parseInt(userId.value),
    scheduleId: parseInt(scheduleId.value),
    description: description.value,
    typeReport: 'mensal',
    isValided: false
  }
  if (id.value) {
    payload.id = parseInt(id.value)
    closeModal()
    const a = axios.post('/report/updateReport', payload)
      .then(result => {
        let message = 'Operação realizada com sucesso!'
        if (result.message) {
          message = result.message
        }
        messageToModalP.textContent = message
        messageToModalP.style.display = 'block'
        informationModal.style.display = 'block'
      })
      .catch(function () {
        console.log(e)
        messageToModal.textContent = e.response.data.message
        messageToModal.style.display = 'block'
        informationModal.style.display = 'block'
      })
  } else {
    axios.post('/schedule/saveSchedule', payload)
      .then(result => (result))
      .catch(function () {
        message = result.message
      })
  }
}

function closeModal () {
  editModal.style.display = 'none'
}

function openModalDelete (obj) {
  idDelete.value = parseInt(obj.id)
  nameDelete.value = obj.name
  deleteModal.style.display = 'block'
}

function closeModalDelete () {
  deleteModal.style.display = 'none'
}

function deleteModalRequest () {
  const payload = {
    id: idDelete.value
  }

  axios.post('/report/deleteReport', payload)
    .then((r) => {
      closeModalDelete()
      let message = 'Operação realizada com sucesso!'
      if (r?.message) {
        message = r.message
      }
      messageToModalP.textContent = message
      messageToModalP.style.display = 'block'
      informationModal.style.display = 'block'
    })
    .catch(e => {
      closeModalDelete()
      console.log(e)
      messageToModal.textContent = e.response?.data?.message
      messageToModal.style.display = 'block'
      informationModal.style.display = 'block'
    })
}

// eslint-disable-next-line no-unused-vars
function filter () {
  const input = document.getElementById('search').value

  const table = document.getElementById('table')
  const trs = table.getElementsByTagName('tr')

  for (const tr of trs) {
    const td1 = tr.getElementsByTagName('td')[3]
    const td2 = tr.getElementsByTagName('td')[4]

    const value1 = td1?.textContent || td1?.innerText
    const value2 = td2?.textContent || td2?.innerText
    if (value1) {
      if (value1.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
      value2.toLowerCase().indexOf(input.toLowerCase()) > -1) {
        tr.style.display = ''
      } else {
        tr.style.display = 'none'
      }
    }
  }
}

function reload () {
  window.location.href = '/meus-relatorios'
}

// eslint-disable-next-line no-unused-vars
function filterDate () {
  const input = new Date(document.getElementById('searchDate').value).toLocaleString('pt-Br').split(',')[0]
  console.log(input === 'Invalid Date')
  const table = document.getElementById('table')
  const trs = table.getElementsByTagName('tr')

  for (const tr of trs) {
    const td1 = tr.getElementsByTagName('td')[1]

    const value1 = td1?.textContent || td1?.innerText
    if (value1) {
      if (value1.indexOf(input) > -1 || input === 'Invalid Date') {
        tr.style.display = ''
      } else {
        tr.style.display = 'none'
      }
    }
  }
}
