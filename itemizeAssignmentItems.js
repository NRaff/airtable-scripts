const {
  menuItems,
  order,
  sqft,
  tieredAssignmentItems,
} = input.config()

class AssignmentTiers {
  constructor(records) {
    this.records = records
    this.tiers = {}
    this.createTiers()
  }

  createTiers() {
    this.records.forEach(tier => {
      const mItemId = tier.getCellValue('Menu Item')[0].id
      this.tiers[mItemId] = tier
    })
  }
}

const tieredAssignmentTable = base.getTable('🪜 Tiered Assignment Menu')
const activeAssignmentTiers = tieredAssignmentTable.getView('Active Assignment Items')
const assignmentTiers = await activeAssignmentTiers.selectRecordsAsync({
  fields: [
    'Menu Item',
    'Min',
    'Max',
    'Key'
  ],
  recordIds: tieredAssignmentItems
})
const { tiers, records } = new AssignmentTiers(assignmentTiers.records)
const assignmentItems = menuItems.map(item => {
  const itemTier = tiers[item] ? [{ id: tiers[item].id }] : []
  return {
    fields: {
      'Order': [{ id: order }],
      'Contractor Rate': [{ id: item }],
      'Contractor Rate Tier': itemTier
    }
  }
})

const assignmentItemsTable = base.getTable('✅ Assignments')
assignmentItemsTable.createRecordsAsync(assignmentItems)
