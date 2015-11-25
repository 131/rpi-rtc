"use strict";

var rtc = require('./');



rtc.setTimeSync(new Date()) ;


setTimeout(function(){

  console.log(rtc.readTimeSync());
}, 2000);

