const { teamReg, participant } = input.config()
const teamRegTable = base.getTable('Team Registration')
const regTeam = await teamRegTable.selectRecordAsync(teamReg[0])
if (regTeam) {
  await teamRegTable.updateRecordAsync(regTeam, {
    'Participants': [
      ...regTeam.getCellValue('Participants'),
      { id: participant }
    ]
  })
}