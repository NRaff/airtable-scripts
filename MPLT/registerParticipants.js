const { regRec } = input.config()

const PARTICIPANT_FIELDS = {
  'First Name': {
    mapsTo: 'First Name',
  },
  'Last Name': {
    mapsTo: 'Last Name'
  },
  'Email Address': {
    mapsTo: 'Email Address'
  },
  'Cell Phone': {
    mapsTo: 'Phone Number'
  },
  'Mailing Address': {
    mapsTo: 'Address'
  },
  'USTA Rating': {
    mapsTo: 'USTA Rating'
  },
  'T-Shirt Size': {
    mapsTo: 'T-Shirt Size'
  },
}

const MPLT_KEYS = Object.keys(PARTICIPANT_FIELDS)
const regTable = base.getTable('Team Registration')
const regFields = regTable.fields
const regRecord = await regTable.selectRecordAsync(regRec)
console.log(createParticipants(regRecord))

function createParticipants(record) {
  const participants = []
  // for nums 1-10
  for (let p = 1; p < 10; p++) {
    // check each field in reg record for the num and for a key in the participant fields (includes)
    const pFields = regFields.filter(field => {
      const leftOfDash = field.name.substr(0, field.name.indexOf('-')).trim()
      return leftOfDash === `Player #${p}`
    }).map(f => f.name)
    const newPlayer = {
      fields: {}
    }
    pFields.forEach(pField => {
      for (const key of MPLT_KEYS) {
        if (pField.includes(key)) {
          newPlayer.fields[key] = record.getCellValue(pField)
        }
      }
    })
    const valsExist = Object.values(newPlayer.fields).some(val => val)
    if (valsExist) {
      participants.push(newPlayer)
    }
  }
  return participants
}