#!/bin/bash
curl -XPOST "http://localhost:8081" -d'{"url":"http://edition.cnn.com/", "selector":".cn--idx-1 .cd__headline .cd__headline-text"}' -H "Content-type: application/json" 
