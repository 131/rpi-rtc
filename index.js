"use strict";

var i2c = require('i2c-bus');

var _ADRESS = 0x30;


function int_to_bcd(x){
  return (parseInt(x/10)<<4) + (x%10);
};

function bcd_to_int(x){
  var result = 0,  high = 0;
  if (x < 0)
    throw "Cannot be a negative integer";
  result = (x & 0x0F)
  high = ((x >> 4) * 10)
  return (result + high)
}

var readTimeSync = function(){
  var bus  = i2c.openSync(1);

  var seconds = bcd_to_int(bus.readByteSync(_ADRESS , 0x02));
  var minutes = bcd_to_int(bus.readByteSync(_ADRESS , 0x03));
  var hours   = bcd_to_int(bus.readByteSync(_ADRESS , 0x04));
  var day     = bcd_to_int(bus.readByteSync(_ADRESS , 0x06));
  var month   = bcd_to_int(bus.readByteSync(_ADRESS , 0x08));
  var year    = bcd_to_int(bus.readByteSync(_ADRESS , 0x09)) + 2000;
  return new Date(year, month - 1, day, hours, minutes, seconds, 0);
}

module.exports.readTimeSync = readTimeSync;

