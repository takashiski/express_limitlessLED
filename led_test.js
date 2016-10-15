"use strict";

var limitlessLED = require("./limitlessLED");


var led = new limitlessLED();

led.action("all_on",100);
led.action("darkest",200);
led.action("blink",5000);
led.action("brightest",10000);
