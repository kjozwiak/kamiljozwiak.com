var express = require('express'),
    app = express();

// Configuration
const PORT = 22935;
const AUDIENCE = "http://localhost:" + PORT;
const NAME = "Kamil Jozwiak - ";

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false, prett: true });
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index', { pageTitle: NAME + 'Blog'});
});

app.get('/resume', function(req, res) {
  res.render('resume', { pageTitle: NAME + 'Resume'});
});

app.get('/projects', function(req, res) {
  res.render('projects', { pageTitle: NAME + 'Projects'});
});

app.get('/links', function(req, res) {
  res.render('links', { pageTitle: NAME + 'Links'});
});

app.get('/about', function(req, res) {
  res.render('about', { pageTitle: NAME + 'About'});
});

app.get('/contact', function(req, res) {
  res.render('contact', { pageTitle: NAME + 'Contact'});
});

app.listen(PORT, function() {
  console.log("Starting server on port %d in %s mode:", PORT, app.settings.env);
});
