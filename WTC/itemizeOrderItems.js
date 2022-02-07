const { order, requestedItems, estSqFt, sqFeetName } = input.config()

const itemizedOrders = base.getTable('⚡️ Order Items')
const orderItems = requestedItems.map(item => {
  return ({
    fields: {
      "Order": [{ id: order }],
      "Menu Item": [{ id: item }]
    }
  })
})

if (sqFeetName[0].includes('=')) {
  const maxString = sqFeetName[0].split('= ')
  const maxSqFt = parseInt(maxString[1].split(',').join(''))

  if (sqFeetName[0].includes('>')) {
    const numItems = Math.ceil((estSqFt - maxSqFt) / 500.00)
    orderItems.push({
      fields: {
        "Order": [{ id: order }],
        "Menu Item": [{ id: 'recy6cFujQ8xFb6dN' }],
        "Number Ordered (if applicable)": numItems
      }
    })
  }
}
await itemizedOrders.createRecordsAsync(orderItems)