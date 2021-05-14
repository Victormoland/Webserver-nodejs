const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const express = require('express');                 // Eases the use of Node.js
const socket = require('socket.io');                // Websocket event handling
const bodyParser = require('body-parser');          // For parsing JSON and data structures

const csrfMiddleware = csrf({ cookie: true });

// port nummer
const port = 80;

var app = express();
 //Omgjør fra ejs til HTML.
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);

app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use('/assets', express.static('assets'));

app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

// Start listening to reqs
var server = app.listen(port, function() {
    console.log('%s Listening for requests on port %d...', Date().toString(), port);
});

//HTML:
app.get('/', (req, res) => {
  console.log(Date().toString(), "Requested URL: ", req.url);
  res.render('oving'); 
});
//Hovedside html:
app.get('/oving.html', (req, res) => {
    console.log(Date().toString(), "Requested URL: ", req.url);
    res.render('oving'); 
  });
//vekt index html:
app.get('/vekt.html', (req, res) => {
  console.log(Date().toString(), "Requested URL: ", req.url);
  res.render('vekt'); 
});

//Sende-Motta data:
var io = socket(server);
io.on("connection", socket => {

//Kontinuerlig Esp-data temperatur sensor  
socket.on("Data-from-mcu", data => {
console.log(data)
socket.broadcast.emit("temp-sensor", data);
  })

//Average Esp-data temperatur sensor  
socket.on("average", data => {
  console.log("Average temp:" + data)
  socket.broadcast.emit("temp-sensor-avg", data);
    })
  
});
