var express = require('express');
var router = express.Router();
var limitlessLED = require("../limitlessLED");
var led = new limitlessLED();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/led/on",function(req,res,next)
		{
			led.on();
			res.render('index', { title: 'Express' });
		});
router.get("/led/off",function(req,res,next)
		{
			led.off();
			res.render('index', { title: 'Express' });
		});
router.get("/led/cooler",function(req,res,next)
		{
			led.cooler();
			res.render('index', { title: 'Express' });
		});
router.get("/led/warmer",function(req,res,next)
		{
			led.warmer();
			res.render('index', { title: 'Express' });
		});
router.get("/led/brighter",function(req,res,next)
		{
			led.brighter();
			res.render('index', { title: 'Express' });
		});
router.get("/led/darker",function(req,res,next)
		{
			led.darker();
			res.render('index', { title: 'Express' });
		});
router.get("/led/night",function(req,res,next)
		{
			led.nightMode();
			res.render('index', { title: 'Express' });
		});
router.get("/led/blink",function(req,res,next)
		{
			led.blink();
			res.render('index', { title: 'Express' });
		});
			

module.exports = router;
