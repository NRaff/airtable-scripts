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

const {
  menuItems,
  order,
  sqft,
  tieredPricingItems
} = input.config()
// get applicable tiered pricing
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
const { tiers } = new PriceTiers(pricedTiers.records)
// given the applicable price tiers, map the menuItems 
// and price tiers together to create the order item (connect based on menu item id)
// iterate over menuItems
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

const orderItemsTable = base.getTable('⚡️ Order Items')
orderItemsTable.createRecordsAsync(orderItems)
    // match pricedTier based on menuItem
    // create orderItem using menu item and matched pricedTier
