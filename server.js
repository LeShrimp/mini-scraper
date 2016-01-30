var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());


var smartStringify = function(o) {
    var cache = [];
    return JSON.stringify(o, function(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
};

app.post('/scrape', function(req, res){
    var body = req.body();

    var url = body.url;
    var selector = body.selector;



    res.send(smartStringify(req));
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
