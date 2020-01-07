const bookshelf = require('./database')
const bcrypt = require('bcrypt')

const Manager = bookshelf.Model.extend({
  tableName: 'managers'
}, {
  login: async ({ username, password }) => {
    const manager = await new Manager({ username }).fetch()
    const valid = await bcrypt.compare(password, manager.get('password'))
    if( !valid )
      throw new Error('Invalid password!')
    return manager
  }
})

const createSampleManager = async ()=> {
  const count = await Manager.count()
  console.log(`Manager count: ${count}`)
  if( count == 0 ) {
    const username = 'devagrawal09'
    const password = await bcrypt.hash('hailsatan', 10)
    const token = ''
    const manager = new Manager({ username, password, token })
    const doc = await manager.save()
    console.log(`Created manager ${doc.get('username')}`)
  }
}

createSampleManager()

module.exports = Manager
