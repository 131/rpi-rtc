"use strict";

var rtc = require('./');



rtc.setTimeSync(new Date() , 0x68 , "DS3231") ;


setTimeout(function(){

  console.log(rtc.readTimeSync(0x68 , "DS3231"));
}, 2000);

