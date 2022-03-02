const { menuItem } = input.config()

const fields = {
  min: 'Min',
  max: 'Max',
  overWriteText: 'Overwrite Text'
}

const defaultTable = base.getTable('⚙️ Default Tiers')
const activeDefView = defaultTable.getView('Active Defaults')
const activeDefaults = await activeDefView.selectRecordsAsync({
  fields: Object.values(fields)
})

const tieredAssignmentMenu = base.getTable('🪜 Tiered Assignment Menu')

const reviewItems = activeDefaults.records.map(tier => {
  return ({
    fields: {
      [fields.min]: tier.getCellValue(fields.min),
      [fields.max]: tier.getCellValue(fields.max),
      [fields.overWriteText]: tier.getCellValueAsString(fields.overWriteText),
      'Menu Item': [{ id: menuItem }]
    }
  })
})

await tieredAssignmentMenu.createRecordsAsync(reviewItems)