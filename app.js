var express = require('express'),
    app = express();
var RSS = require('rss');
var fs = require('fs');

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

// loading JSON into memory
fs.readFile(__dirname + '/data/blogPosts.json', 'utf8', function(err, data) {
  var blogArray = JSON.parse(data);
});

// creating the RSS feed
app.get('/feed/rss', function(req, res) {
  var feed = new RSS ({
    title: 'Kamil Jozwiaks Blog',
    feed_url: 'http://' + req.headers.host + req.url,
    site_url: 'http://' + req.headers.host,
    author: 'Kamil Jozwiak',
    language: 'en'
  });

  feed.item({
    title: 'Welcome to my blog!!',
    description: 'Technologies used to create this blog and what to expect in future blog entries',
    url: 'http://www.google.ca', //testing on live server
    date: 'December 8, 2013'
  });

  res.type('rss');
  res.send(feed.xml());
});
