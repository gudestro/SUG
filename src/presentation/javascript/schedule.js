/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const id = document.getElementById('id')
const createdAt = document.getElementById('createdAt')
const user = document.getElementById('usersSelect')
const construction = document.getElementById('constructionId')
const description = document.getElementById('description')
const allocation = document.getElementById('allocationSelect')
const allocationCreatedAt = document.getElementById('allocationCreatedAt')
const dateSchedule = document.getElementById('dateSchedule')
const status = document.getElementById('statusSelect')
const idDelete = document.getElementById('idDelete')
const nameDelete = document.getElementById('nameDelete')
const nameDelete2 = document.getElementById('nameDelete2')
const editModal = document.getElementById('editModal')
const deleteModal = document.getElementById('deleteModal')
const errorMessage = document.getElementById('errorMessage')
const errorMessageDelete = document.getElementById('errorMessageDelete')

const informationModal = document.getElementById('informationModal')
const messageToModal = document.getElementById('message')
const messageToModalP = document.getElementById('messageP')

VMasker(dateSchedule).maskPattern('99/99/9999')

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
    user.value = 0
    construction.value = 0
    allocation.value = 0
    dateSchedule.value = ''
    status.value = 0
    description.value = ''
  } else {
    id.value = schedule.id
    createdAt.value = schedule.createdAt
    user.value = schedule.userId
    status.value = schedule.status
    construction.value = schedule.constructionId
    allocation.value = schedule.allocationId
    dateSchedule.value = schedule.dateSchedule.split('T')[0]
    description.value = schedule.description
  }
  editModal.style.display = 'block'
}

function requestModal () {
  const message = ''
  const date = new Date()
  date.setDate(date.getDate() - 1)
  const validateDate = new Date(dateSchedule.value)

  if (validateDate <= date) {
    errorMessage.textContent = 'Não é possivel marcar agendamento no passado.'
    errorMessage.style.display = 'block'
    console.log(validateDate)
    return
  }

  const payload = {
    userId: parseInt(user.value),
    constructionId: parseInt(construction.value),
    allocationId: parseInt(allocation.value),
    dateSchedule: new Date(dateSchedule.value),
    status: status.value,
    description: description.value
  }
  payload.dateSchedule.setHours(payload.dateSchedule.getHours() + 3)
  if (id.value) {
    payload.id = parseInt(id.value)
    payload.createdAt = createdAt.value

    const a = axios.post('/schedule/updateSchedule', payload)
      .then(result => {
        let message = 'Operação realizada com sucesso!'
        if (result.message) {
          message = result.message
        }
        messageToModalP.textContent = message
        messageToModalP.style.display = 'block'
        informationModal.style.display = 'block'
      })
      .catch(function (error) {
        console.log(error)
        messageToModal.textContent = error.response?.data.message
        messageToModal.style.display = 'block'
        informationModal.style.display = 'block'
      })
  } else {
    axios.post('/schedule/saveSchedule', payload)
      .then(result => {
        let message = 'Operação realizada com sucesso!'
        if (result.message) {
          message = result.message
        }
        messageToModalP.textContent = message
        messageToModalP.style.display = 'block'
        informationModal.style.display = 'block'
      })
      .catch(function (error) {
        console.log(error)
        messageToModal.textContent = error.response?.data.message
        messageToModal.style.display = 'block'
        informationModal.style.display = 'block'
      })
  }

  closeModal()
}

function reload () {
  window.location.href = '/agendamento'
}

function closeModal () {
  editModal.style.display = 'none'
}

function openModalDelete (obj) {
  idDelete.value = parseInt(obj.id)
  nameDelete.value = `${obj.name}`
  nameDelete2.value = `${obj.name2}`
  deleteModal.style.display = 'block'
}

function closeModalDelete () {
  deleteModal.style.display = 'none'
}

function deleteModalRequest () {
  const payload = {
    id: idDelete.value
  }

  axios.post('/schedule/deleteSchedule', payload)
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
      messageToModal.textContent = e.response.data.message
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
    const td1 = tr.getElementsByTagName('td')[2]
    const td2 = tr.getElementsByTagName('td')[3]

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

// eslint-disable-next-line no-unused-vars
function filterDate () {
  const input = new Date(document.getElementById('searchDate').value).toLocaleString('pt-Br').split(',')[0]
  console.log(input === 'Invalid Date')
  const table = document.getElementById('table')
  const trs = table.getElementsByTagName('tr')

  for (const tr of trs) {
    const td1 = tr.getElementsByTagName('td')[6]

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
