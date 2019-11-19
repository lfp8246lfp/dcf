export function exportExcel (data, name) {
  let blob = new Blob([data], {type: 'application/vnd.ms-excel'})
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', `${name}.xls`)
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}