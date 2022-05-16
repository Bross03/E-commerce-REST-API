const client= require('./db');


(async()=>{
    
await client.connect();
client.query(`SELECT * FROM users`, (err, res)=>{
        if(!err){
            console.log(res.rows);
        }
        else{
            console.log(err.message);
        }

client.end();
})})();
// client.connect();
// client.query(`INSERT INTO users 
// VALUES($1, $2, $3, $4, $5, $6, $7)`,[1,'jpbrossel@hotmail.com','hey', 'j', 'bross', {'hey':'hey'},{'hey':'hey'} ], (err, res)=>{
//     if(!err){
//         console.log('yay');
//     }
//     else{
//         console.log(err.message);
//     }
//     client.end()
// });
// client.query(`SELECT * FROM users`, (err, res)=>{
//     if(!err){
//         console.log(res.rows);
//     }
//     else{
//         console.log(err.message);
//     }
//     client.end()
// })