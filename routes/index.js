var express = require('express');
var router = express.Router();
var limitlessLED = require("../limitlessLED");
var led = new limitlessLED();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: req.query.action, key_set : led.key_set});
});
router.get("/led",function(req,res,next)
		{
			led.action(req.query.action,req.query.time,req.query.interval);
			res.render('index', { title: req.query.action, key_set : led.key_set});
		});

module.exports = router;
