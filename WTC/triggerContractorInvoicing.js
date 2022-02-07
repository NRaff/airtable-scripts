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
while (updatedContractors.length > 0) {
  contractorsTable.updateRecordsAsync(updatedContractors.splice(0, 45))
}