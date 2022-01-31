// * Daily Habits
const habitsTable = base.getTable('Habits')
const view = habitsTable.getView("Daily Habits in Progress")
const habits = await view.selectRecordsAsync()
const weekPlan = []
const date = new Date()
let days = 0
let newDate = new Date()
while (days < 7) {
  const newHabits = habits.records.map(habit => {
    return ({
      fields: {
        "Habit": [{ id: habit.id }],
        "Date": newDate,
        "Done?": { name: 'Incomplete' }
      },
    })
  })
  weekPlan.push(...newHabits)
  newDate = new Date(date.setDate(date.getDate() + 1))
  days++
}
let dailyTable = base.getTable('Habit Checkbox')
while (weekPlan.length > 0) {
  dailyTable.createRecordsAsync(weekPlan.splice(0, 45))
}


// * Weekly Habits
const habitsTable = base.getTable('Habits')
const view = habitsTable.getView("Weekly Habits in Progress")
const habits = await view.selectRecordsAsync()
const date = new Date()
const weeklyHabits = habits.records.map(habit => {
  return ({
    fields: {
      "Habit": [{ id: habit.id }],
      "Date": date,
      "Done?": { name: 'Incomplete' }
    }
  })
})
let dailyTable = base.getTable('Habit Checkbox')
while (weeklyHabits.length > 0) {
  dailyTable.createRecordsAsync(weeklyHabits.splice(0, 45))
}
