const { contractorName } = input.config()
const today = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
today.setHours(0, 0, 0, 0)
const twoWeeksStart = new Date(Date.now() - 13 * 24 * 60 * 60 * 1000)
twoWeeksStart.setHours(0, 0, 0, 0);
const twoWeeksEnd = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
twoWeeksEnd.setHours(0, 0, 0, 0);
const assignmentsTable = base.getTable('✅ Assignments')
const unInvoicedView = assignmentsTable.getView('NOT INVOICED')
const assignmentResults = await unInvoicedView.selectRecordsAsync({
  fields: [
    'Assignment Key',
    '⚡️ Included in Invoice?',
    'Start Date (from Order)',
    'Contractor',
    'Confirmed Payment'
  ]
})
const assignmentsToInvoice = assignmentResults.records.filter(rec => {
  const checkDate = Date.parse(rec.getCellValue('Start Date (from Order)'))
  const datesIncluded = checkDate >= twoWeeksStart.getTime() && checkDate <= twoWeeksEnd.getTime()
  const correctContractor = contractorName === rec.getCellValueAsString('Contractor')
  if (datesIncluded && correctContractor) return rec
})
console.log(assignmentsToInvoice)
let total = 0
assignmentsToInvoice.forEach(rec => {
  const confirmedPayment = rec.getCellValue('Confirmed Payment')
  total += confirmedPayment
})
const setInvoiced = assignmentsToInvoice.map(rec => {
  return {
    id: rec.id,
    fields: {
      '⚡️ Included in Invoice?': today
    }
  }
})

await assignmentsTable.updateRecordsAsync(setInvoiced)

output.set('from', twoWeeksStart.toDateString())
output.set('to', twoWeeksEnd.toDateString())
output.set('totalInvoice', total)
