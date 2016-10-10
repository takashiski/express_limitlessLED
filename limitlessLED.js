var sleep = require("sleep-async")();
var dgram = require("dgram");


module.exports = function(host,port)
{
	var self = this;
	this.host = host||"10.0.0.4";
	this.port = port||8899;
	this.setInstruction = function(num)
	{
		var array = [0,0,55];
		array[0] = num;
		return array;
	};
	this.client = dgram.createSocket("udp4");
	this.sendMessage = function(message,time){
		var offset_time = time || 100;
		var msg = this.convertHexToDec(message);
		msg = new Buffer(msg);
		console.log(msg);
		sleep.sleep(offset_time,function(){
			self.client.send(msg,0,msg.length,self.port,self.host,function(err){console.log(err);});
		})
	}


	this.convertHexToDec = function(array)
	{
		var a=[];
		for(var i in array)
		{
			a[i] = parseInt(array[i],16);
		}
		return a;
	}
	this.instruction_set = {
		all_off : this.setInstruction(39),
		all_on : this.setInstruction(35),
		brightness_up : this.setInstruction("3C"),
		brightness_down : this.setInstruction("34"),
		warmer : this.setInstruction("3e"),
		cooler : this.setInstruction("3f"),
		night_mode_all : this.setInstruction(39),
		nignt_mode_all_press_hold : this.setInstruction("BB"),
		all_brightness_full : this.setInstruction(35),
		all_brightness_full_press_hold : this.setInstruction("B5")
	};	
	this.on = function(time)
	{
		this.sendMessage(this.instruction_set.all_on,time);
	};

	this.off = function(time)
	{
		this.sendMessage(this.instruction_set.all_off,time);
	}

	this.brighter = function()
	{
		this.sendMessage(this.instruction_set.brightness_up);
	}
	this.darker = function()
	{
		this.sendMessage(this.instruction_set.brightness_down);
	}
	this.warmer = function()
	{
		this.sendMessage(this.instruction_set.warmer);
	}
	this.cooler = function()
	{
		this.sendMessage(this.instruction_set.cooler);
	}
	this.full = function()
	{
		this.sendMessage(this.instruction_set.all_on,0);
		this.sendMessage(this.instruction_set.all_brightness_full_press_hold);
	}
	this.nightMode = function()
	{
		this.sendMessage(this.instruction_set.night_mode_all_press_hold);
		this.sendMessage(this.instruction_set.all_on,0);
		this.sendMessage(this.setInstruction("B9"),100);
	}
	this.blink = function()
	{
		this.sendMessage(this.instruction_set.all_off,0);
		this.sendMessage(this.instruction_set.all_on,500);
		this.sendMessage(this.instruction_set.all_off,1000);
		this.sendMessage(this.instruction_set.all_on,1500);
	}

	console.log(this);

//起動しましたよ証明
//-------------------------------------------------------------------------------

//	console.log(this.instruction_set);
//	

//	this.sendMessage(self.instruction_set["all_off"]);
	//console.log(this);



}
//-----------------------------------------------------------------------------


