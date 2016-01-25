"use strict";

var rtc = require('./');



rtc.setTimeSync(new Date() , 0x30) ;


setTimeout(function(){

  console.log(rtc.readTimeSync(0x30));
}, 2000);

