const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());



const api1 = require('./api1/routers/route');
const api2 = require('./api2/routers/route');

app.use('/api2', api2);

app.use(function(req, res) {
    res.send('<h1>Page Not Found!</h1>');
    res.end();
});

app.listen(port, function(res, res) {
    console.log('server is listening at port ' + port);
})