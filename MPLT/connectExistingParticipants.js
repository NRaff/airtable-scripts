// ! DEPRECATED
const { teamReg, newParticipant } = input.config()
const teamRegTable = base.getTable('Team Registration')
const regTeam = await teamRegTable.selectRecordAsync(teamReg[0])
if (regTeam) {
  const ps = regTeam.getCellValue('Participants') ? regTeam.getCellValue('Participants').map(p => ({ id: p.id })) : []
  await teamRegTable.updateRecordAsync(regTeam, {
    'Participants': [
      ...ps,
      { id: newParticipant[0] }
    ]
  })
}