const {
  menuItems,
  order,
  sqft,
  tieredPricingItems,
  addOnSqFt
} = input.config()
const [SQ_FT_ADDON] = addOnSqFt
const SQ_FT_MAX = 1000000 // 1 million
class PriceTiers {
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

const tieredPriceTable = base.getTable('🪜 Tiered Pricing Menu')
const activePriceTiers = tieredPriceTable.getView('Active Pricing')
const pricedTiers = await activePriceTiers.selectRecordsAsync({
  fields: [
    'Menu Item',
    'Min',
    'Max',
    'Key'
  ],
  recordIds: tieredPricingItems
})
const { tiers, records } = new PriceTiers(pricedTiers.records)
const orderItems = menuItems.map(item => {
  const itemTier = tiers[item] ? [{ id: tiers[item].id }] : []
  return {
    fields: {
      'Order': [{ id: order }],
      'Menu Item': [{ id: item }],
      'Menu Item Tier': itemTier
    }
  }
})

function createAddOn() {
  const [tierMin, tierMax] = [records[0].getCellValue('Min'), records[0].getCellValue('Max')]
  console.log(tierMax)
  if (tierMax >= SQ_FT_MAX) {
    const extraItems = Math.ceil((sqft - tierMin) / 500)
    orderItems.push({
      fields: {
        'Order': [{ id: order }],
        'Menu Item': [{ id: SQ_FT_ADDON }],
        'Number Ordered (if applicable)': extraItems,
        'Menu Item Tier': []
      }
    })
  }
}

createAddOn()

const orderItemsTable = base.getTable('⚡️ Order Items')
orderItemsTable.createRecordsAsync(orderItems)
