/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const id = document.getElementById('id')
const cnpj = document.getElementById('cnpj')
const contact = document.getElementById('contact')
const idDelete = document.getElementById('idDelete')
const nameDelete = document.getElementById('nameDelete')
const editModal = document.getElementById('editModal')
const createdAt = document.getElementById('createdAt')
const nameCompany = document.getElementById('nameCompany')
const deleteModal = document.getElementById('deleteModal')
const errorMessage = document.getElementById('errorMessage')
const errorMessageDelete = document.getElementById('errorMessageDelete')
const nameResponsiblePerson = document.getElementById('nameResponsiblePerson')
const contactResponsiblePerson = document.getElementById('contactResponsiblePerson')

const informationModal = document.getElementById('informationModal')
const messageToModal = document.getElementById('message')
const messageToModalP = document.getElementById('messageP')

VMasker(contact).maskPattern('(99) 99999-9999')
VMasker(cnpj).maskPattern('99.999.999/9999-99')
VMasker(contactResponsiblePerson).maskPattern('(99) 99999-9999')

function openModal (company) {
  if (!company) {
    cnpj.value = ''
    contact.value = ''
    nameCompany.value = ''
    nameResponsiblePerson.value = ''
    contactResponsiblePerson.value = ''
  } else {
    id.value = company.id
    createdAt.value = company.createdAt
    cnpj.value = company.cnpj
    contact.value = company.contact
    nameCompany.value = company.nameCompany
    nameResponsiblePerson.value = company.nameResponsiblePerson
    contactResponsiblePerson.value = company.contactResponsiblePerson
  }
  editModal.style.display = 'block'
}

function requestModal () {
  const message = ''

  const payload = {
    cnpj: cnpj.value,
    contact: contact.value,
    nameCompany: nameCompany.value,
    nameResponsiblePerson: nameResponsiblePerson.value,
    contactResponsiblePerson: contactResponsiblePerson.value
  }
  closeModal()
  if (id.value) {
    payload.id = id.value
    payload.createdAt = createdAt.value

    const a = axios.post('/company/updateCompany', payload)
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

    console.log(a)
  } else {
    axios.post('/company/saveCompany', payload)
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
  window.location.href = '/companhia'
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
    id: parseInt(idDelete.value)
  }

  axios.post('/company/deleteCompany', payload)
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
    const td = tr.getElementsByTagName('td')[4]

    const value = td?.textContent || td?.innerText
    if (value) {
      if (value.toLowerCase().indexOf(input.toLowerCase()) > -1) {
        tr.style.display = ''
      } else {
        tr.style.display = 'none'
      }
    }
  }
}
