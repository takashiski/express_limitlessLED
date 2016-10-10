var limitlessled = require("./limitlessLED");

var led = new limitlessled();
led.on();
led.off(1000);
led.on(2000);
led.nightMode();
