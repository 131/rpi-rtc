"use strict";

var i2c = require('i2c-bus');

const supportedRtcVersion = {
  "DS1307" : "./DS1307.JSON",
  "DS3231" : "./DS3231.JSON"
}

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

var setTimeSync = function(date , adress , rtc_version) {
  
  if(!adress)
    throw "must give I2C address of the clock"
  var bus  = i2c.openSync(1);
  
  var rtc_file = supportedRtcVersion[rtc_version]
  if(!rtc_file)
    throw "must give rtc_version version";
  
  var rtc_addr_param = require(rtc_file)

  bus.writeByteSync(adress, parseInt(rtc_addr_param.write.seconds) , int_to_bcd(date.getSeconds()));
  bus.writeByteSync(adress, parseInt(rtc_addr_param.write.minutes) , int_to_bcd(date.getMinutes()));
  bus.writeByteSync(adress, parseInt(rtc_addr_param.write.hours)   , int_to_bcd(date.getHours()));
  bus.writeByteSync(adress, parseInt(rtc_addr_param.write.day)     , int_to_bcd(date.getDate()));
  bus.writeByteSync(adress, parseInt(rtc_addr_param.write.month)   , int_to_bcd(date.getMonth()+1));
  bus.writeByteSync(adress, parseInt(rtc_addr_param.write.year2) , int_to_bcd(0x20));
  bus.writeByteSync(adress, parseInt(rtc_addr_param.write.year)    , int_to_bcd(date.getFullYear()-2000));
  bus.writeByteSync(adress, parseInt(rtc_addr_param.write.end),1);

  bus.closeSync();
}


var readTimeSync = function(adress , rtc_version){
  if(!adress)
    throw "must give I2C address of the clock"
  
  var rtc_file = supportedRtcVersion[rtc_version]
  if(!rtc_file)
    throw "must give rtc_version version";
    
  var bus  = i2c.openSync(1);

  var seconds = bcd_to_int(bus.readByteSync(adress , parseInt(rtc_addr_param.read.seconds)));
  var minutes = bcd_to_int(bus.readByteSync(adress , parseInt(rtc_addr_param.read.minutes)));
  var hours   = bcd_to_int(bus.readByteSync(adress , parseInt(rtc_addr_param.read.hours)));
  var day     = bcd_to_int(bus.readByteSync(adress , parseInt(rtc_addr_param.read.day)));
  var month   = bcd_to_int(bus.readByteSync(adress , parseInt(rtc_addr_param.read.month)));
  var year    = bcd_to_int(bus.readByteSync(adress , parseInt(rtc_addr_param.read.year))) + 2000;

  bus.closeSync();

  return new Date(year, month - 1, day, hours, minutes, seconds, 0);
}

module.exports.readTimeSync = readTimeSync;
module.exports.setTimeSync  = setTimeSync;
