// Подключение библиотек
const express = require('express')
const mssql = require('mssql')
const twig = require('twig')
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 8058;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
twig.cache(false);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join("D:\\priem_univer")));
app.use(express.static(path.join(__dirname, '..', 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Конфигурация к подключение БД
const zhguConfig = {
    server: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    encrypt: false,
    database: process.env.DB_NAME1,
    pool: {
        max: 200,
        min: 5,
        idleTimeoutMillis: 30000
    }
};

app.use(session({
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 10 },
}));
app.use((req, res, next) => {
    req.dbPool = dbPool; 
    next();
});
// Import routes
const authRouter = require('./routes/authRouter')
const dashboardRouter = require('./routes/dashboardRouter')
const jurnalRouter = require('./routes/jurnalRouter')
const profileRouter = require('./routes/profileRouter')
const putevoditelRouter = require('./routes/putevoditelRouter')
const digitalServicesRouter = require('./routes/digitalServicesRouter')

// Using routes
app.use('/auth',authRouter)
app.use('/dashboard',dashboardRouter)
app.use('/jurnal',jurnalRouter)
app.use('/profile',profileRouter)
app.use('/putevoditel',putevoditelRouter)
app.use('/services',digitalServicesRouter)

const dbPool = new mssql.ConnectionPool(zhguConfig);
dbPool.connect(err => {
    if(err)
        console.log(err);
    else
        console.log('Connection to db ' + zhguConfig.database + ' - [OK]');
});

// Функция сервера
const start = async () => {
    try {        
        app.listen(PORT , ()=> console.log('Started on port: ' + PORT));
    } catch (error) {
        console.log(error)
    }
}

//Запуск сервера
start();