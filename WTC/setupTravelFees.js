const { contractorId, contractorName } = input.config()

const citiesTable = base.getTable('🌉 Cities')
const travelFeesTable = base.getTable('🚘 Travel Fees')
const activeView = citiesTable.getView('Active Cities (Not client facing)')
const activeCities = await activeView.selectRecordsAsync()
const mappedFees = activeCities.recordIds.map(cityId => {
  return ({
    fields: {
      "Team Member": [{ id: contractorId }],
      "City": [{ id: cityId }]
    }
  })
})

await travelFeesTable.createRecordsAsync(mappedFees)