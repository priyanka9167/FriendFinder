const {Pool} = require('pg');

const pool = new Pool({
    user: 'priyanka',
    host: 'localhost',
    database: 'instagram',
    password: 'priyanka9167',
    port: 5432,
})

module.exports = pool