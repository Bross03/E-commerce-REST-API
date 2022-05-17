const { Pool} = require('pg')



const pool= new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'postgres',
    database: 'E-commerce',
    max: 10
});



module.exports=pool;
