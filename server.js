const express= require('express');
const app= express();
const cors=require('cors');
const bodyParser=require('body-parser');
const session=require("express-session");
const routes=require('./routes');

const PORT = process.env.PORT || 3000;

async function startServer(){

    app.use(cors());
    
    app.use(bodyParser.json());

    app.get('/', (req, res ,next)=>{
        res.send('Welcome to an E-commerce App REST API');
    });
    
    routes(app);

    app.listen(PORT, ()=>{
        console.log('App listening on port '+ PORT);
    });
}
startServer();