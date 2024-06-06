// eslint-disable-next-line no-unused-vars
function filter () {
  const input = document.getElementById('filterTable').value

  const table = document.getElementById('table')
  const trs = table.getElementsByTagName('tr')

  for (const tr of trs) {
    const td1 = tr.getElementsByTagName('td')[3]

    const value1 = td1?.textContent || td1?.innerText
    if (value1) {
      if (value1.toLowerCase() === input.toLowerCase()) {
        tr.style.display = ''
      } else if (input === 'all') {
        tr.style.display = ''
      } else {
        tr.style.display = 'none'
      }
    }
  }
}
