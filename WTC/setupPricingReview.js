const { menuItem, sqftTiers } = input.config()
const pricingReview = base.getTable('⚡️ Pricing Review')

const reviewItems = sqftTiers.map(tier => {
  return ({
    fields: {
      "Sq. Ft Tier": [{ id: tier }],
      "💵 Pricing Menu": [{ id: menuItem }]
    }
  })
})

await pricingReview.createRecordsAsync(reviewItems)