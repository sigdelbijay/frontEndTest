var express = require('express');
var ejs = require('ejs');

var app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index');
})

app.listen(8849);
console.log('Server listening on port 8849');
