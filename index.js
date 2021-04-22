const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const db_connection = require('./services/db');
const web_routes = require('./routes/web');


const app = express();
app.use(session({secret:'heyougu',saveUninitialized: true,resave: true}));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.use(cors());
dotenv.config();

//for session
app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});

//db connection
db_connection.connection_db()

//static files
app.use(express.static('public'))

app.get('/.well-known/pki-validation/810E27D55D0E37C25303F0185AB198DE.txt', function(req, res) {
    res.send(`
    48C72EC27289727142C9E2979C0E5718C23D07022CBACD5ECDA54CD19BA391E6
    comodoca.com
    9d910e3d7468fad`
    )
})
//Routes imported here
app.use(web_routes);

//view engine here
app.engine('.hbs', exphbs({
    defaultLayout: 'user',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');



//Now tisten to this port 
if (app.listen(process.env.PORT || 5000)) {
    console.log("Server is listening to Port " + process.env.PORT);
}
else{
    console.log("An error occured");
}

//uncomment if you intend to export
//module.exports = app;