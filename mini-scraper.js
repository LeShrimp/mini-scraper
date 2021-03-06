// Thanks to Adnan Kukic
// https://scotch.io/tutorials/scraping-the-web-with-node-js
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');


// Functionality
var fetchMatchingTexts = function(url, selector, successCallback, errorCallback) {
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var texts = [];

            var findTextNodes = function findRecursively($object) {
                $object.contents().each(function() {
                    if (this.nodeType === 3) {
                        text = $(this).text().trim();

                        if (text !== '') {
                            texts.push(text);
                        }
                    } else {
                        findRecursively($(this));
                    }
                });
            };

            findTextNodes($(selector));

            successCallback(texts);
        } else {
            errorCallback();
        }
    });
};

// Server
var app = express()

// parse application/json
app.use(bodyParser.json())

app.options('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.send();
});

app.post('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    if ("url" in req.body && "selector" in req.body) {
        fetchMatchingTexts(req.body.url, req.body.selector, function (texts) {
            res.send({"result" : texts});
        }, function () {
            res.send({"error" : "Connection failed."});
        });
    } else {
        res.send({"error" : "Invalid body."});
    }
});

app.listen('63953')
console.log('Magic happens on port 63953');
exports = module.exports = app;
