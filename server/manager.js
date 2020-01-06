const bookshelf = require('./database')
const bcrypt = require('bcrypt')

module.exports = bookshelf.model('Manager',{
  tableName: 'managers'
}, {
  login: (email, password) => {
    return new this({ email }).fetch().tap(customer => {
      return bcrypt.compare(password, customer.get('password')).then(valid => {
        if(!valid) throw new Error('Invalid password!')
      })
    })
  }
})
