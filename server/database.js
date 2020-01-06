const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset: 'utf8'
    }
})
const bookshelf = require('bookshelf')(knex)

/* knex.schema.createTable('applicants', function(table) {
    table.increments()
    table.string('firstName')
    table.string('lastName')
    table.timestamps()
}) */

module.exports = bookshelf