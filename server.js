const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const session = require('express-session')
const url = require('url');
const dotenv = require("dotenv").config();
const hoursRoutes = require('./src/routes/hours.routes')
const clientsRoutes = require('./src/routes/clients.routes')
const scheduleRoutes = require('./src/routes/schedule.routes')
const userRoutes = require('./src/routes/user.routes')
const loginRoutes = require('./src/routes/login.routes')


const app = express();
const port = 3000;

app.set('views', __dirname + '/src/views')
app.engine('.hbs', engine({
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(myconnection(mysql, {
  host: process.env.DATABASE_HOST ,
  user: process.env.DATABASE_USER ,
  password: process.env.DATABASE_PASSWORD ,
  port: process.env.DATABASE_PORT ,
  database: process.env.DATABASE ,
  dateStrings: 'date',
}))

app.use(session({
  secret: process.env.SECRET ,
  resave: false,
  saveUninitialized: true
}))


app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/horas')
});

app.use('/horas', hoursRoutes);
app.use('/clientes', clientsRoutes);
app.use('/usuario', userRoutes);
app.use('/horario', scheduleRoutes);
app.use('/login', loginRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});