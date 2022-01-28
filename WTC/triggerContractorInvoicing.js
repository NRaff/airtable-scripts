const contractorsTable = base.getTable("📸 WTC Team")
const activeContractorsView = contractorsTable.getView("Active Contractors")
const contractors = await activeContractorsView.selectRecordsAsync()
const updatedContractors = contractors.records.map(ct => {
  return ({
    id: ct.id,
    fields: {
      "⚡️ Send Invoice": true
    }
  })
})
await contractorsTable.updateRecordsAsync(updatedContractors)
console.log(`Sent ${updatedContractors.length} contractor invoices.`)