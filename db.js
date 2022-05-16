const {Client} = require('pg')

const {DB}= require('./configuration');

const client= new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'postgres',
    database: 'E-commerce'
});

client.on("connect",()=>{
    console.log("Database Connected");
});

client.on("end",()=>{
    console.log('Connection ended');
})

module.exports=client;
