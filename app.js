"use strict";

// Imports needed modules
var express = require('express'),
    app = express();
var RSS = require('rss');
var fs = require('fs');

// Global variables
var blogArray;
var blogCount = 0;

// Configuration
var PORT = 22935;
var AUDIENCE = "http://localhost:" + PORT;
var NAME = "Kamil Jozwiak - ";

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false, prett: true });
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index', { pageTitle: NAME + 'Blog', blogArray: blogArray});
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

// Loading the JSON & blog files into an array (will eventually use redis, see Issue #8)
fs.readFile(__dirname + '/data/blogPosts.json', 'utf8', function(err, data) {
  if (err) {
    console.log('Error Found: ' + err);
  }
  blogArray = JSON.parse(data);

  blogArray.forEach(function(post) {
    blogCount++
    var currentCount = blogCount;
    fs.readFile(__dirname + '/data/blogs/' + blogArray[blogCount - 1].slug + '.txt', 'utf8', function(err, fileData) {
      if (err) {
        console.log('Error Found: ' + err);
      }
      post.data = fileData;
      if (currentCount == blogArray.length) {
        app.listen(PORT, function() {
          console.log("Starting server on port %d in %s mode:", PORT, app.settings.env);
        });
      }
    });
  });
});

// RSS feed using node-rss
app.get('/feed/rss', function(req, res) {
  var feed = new RSS ({
    title: 'Kamil Jozwiaks Blog',
    feed_url: 'http://' + req.headers.host + req.url,
    site_url: 'http://' + req.headers.host,
    author: 'Kamil Jozwiak',
    language: 'en'
  });

  blogArray.forEach(function(rssItem) {
    feed.item({
      title: rssItem.title,
      description: rssItem.description,
      url: rssItem.URL,
      date: rssItem.postedOnDate
    });
  });

  res.type('rss');
  res.send(feed.xml());
});
