#!/bin/bash
curl -XPOST "http://localhost:8081/scrape" -d'{"url":"http://www.xkcd.com", "selector":"#middleContainer"}' -H "Content-type: application/json" 
