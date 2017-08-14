// *** Coffeebot Slack Webhook ***

const url = 'https://hooks.slack.com/services/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';
var method = 'POST';
var postData = '{"text": "I love you a latte!"}'

// '{"channel": "#tesselcoffee", "username": "coffebot", "text": "This is posted to #tesselcoffee and comes from a bot named coffeebot.", "icon_emoji": ":coffee:"}'
var async = true;

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();

request.onload = function () {
   var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
   var data = request.responseText; // Returned data, e.g., an HTML document.
}

// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic accelerometer example logs a stream
of x, y, and z data from the accelerometer
*********************************************/

var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);

var diffArr = [];
var rawData = [];

  accel.on('ready', function () {

    accel.on('data', function (xyz) {
      analyzeData(xyz[2])
    })
  })

let analyzeData = function (data) {
  //console.log('Here we are', data)
  console.log('listening')
  rawData.push(data)
  if (rawData.length > 10) {
    //console.log('Here we are')
    let diff = Math.max.apply(null, rawData) - Math.min.apply(null, rawData)
    //console.log('diff', diff)
    if (diff > Math.abs(1)) {
      diffArr.push(1);
    } else {
      diffArr.push(0)
    }
    var result = diffArr.reduce(function (a, b) {
      return a + b;
    }, 0);
    if (result >= 3) {
      console.log('we need coffeeeeee')
      // coffeebot here
      request.open(method, url, async);
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(postData);
      // request.onload();
      // setInterval(function () {
      //   tessel.led[2].toggle();
      //   tessel.led[3].toggle();
      // }, 100);

      diffArr = [];
      result = 0;
    }
    rawData = []
    if(diffArr.length > 10){
      diffArr = [];
      result = 0;
    }
  }
  
}


// *** Coffeebot continued ***


