"use strict";

var rtc = require('./');



rtc.setTimeSync(new Date() , 0x30 , "DS1307") ;


setTimeout(function(){

  console.log(rtc.readTimeSync(0x30 , "DS1307"));
}, 2000);

