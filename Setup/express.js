const cors=require('cors');
const bodyParser=require('body-parser');
const session=require("express-session");

module.exports=async (app)=>{

    app.use(cors());
    
    app.use(bodyParser.json());

    app.use(
        session({
          secret: "dc3bh38820wh2i",
          cookie: { maxAge: 86400000, secure: false },
          resave: false,
          saveUninitialized: false
        })
    );

    return app;
}