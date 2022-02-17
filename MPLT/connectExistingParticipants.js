const { teamReg, newParticipant } = input.config()
const teamRegTable = base.getTable('Team Registration')
const regTeam = await teamRegTable.selectRecordAsync(teamReg[0])
console.log(regTeam)
if (regTeam) {
  await teamRegTable.updateRecordAsync(regTeam, {
    'Participants': [
      ...regTeam.getCellValue('Participants'),
      { id: newParticipant[0] }
    ]
  })
}