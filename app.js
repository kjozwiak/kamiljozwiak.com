var express = require('express');

// Configuration
const PORT = 22935;
const AUDIENCE = "http://localhost:" + PORT

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false, prett: true });
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index', { pageTitle: 'Home'});
});

app.listen(PORT, function() {
  console.log("Starting server on port %d in %s mode:", PORT, app.settings.env);
});
