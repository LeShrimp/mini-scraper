// Thanks to Adnan Kukic
// https://scotch.io/tutorials/scraping-the-web-with-node-js
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');


// Functionality
var getMatchingText = function(url, selector, successCallback) {
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var texts = [];
            var findTextNodes = function findRecursively($object) {
                $object.contents().each(function() {
                    if (this.nodeType === 3) {
                        texts.push(this.data);
                    } else {
                        findRecursively($(this));
                    }
                });
            };

            findTextNodes($(selector));

            successCallback(texts);
        }
    });
};

// Server
var app = express()

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    if ("url" in req.body && "selector" in req.body) {
        getMatchingText(req.body.url, req.body.selector, function (texts) {
            res.send({"result" : texts});
        });
    } else {
        res.send({"error" : "Invalid body."});
    }
});

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
