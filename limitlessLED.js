"use strict";
var sleep = require("sleep-async")();
var dgram = require("dgram");


//-----------------------------------------------------------------------------

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
		console.log(time);
		sleep.sleep(offset_time,function(){
			self.client.send(msg,0,msg.length,self.port,self.host,function(err){if(err)console.log("error : "+err);});
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
		all_off : this.setInstruction("39"),
		all_on : this.setInstruction("35"),
		brightness_up : this.setInstruction("3C"),
		brightness_down : this.setInstruction("34"),
		warmer : this.setInstruction("3e"),
		cooler : this.setInstruction("3f"),
		night_mode_all : this.setInstruction("B9"),
		nignt_mode_all_press_hold : this.setInstruction("BB"),
		all_brightness_full : this.setInstruction("35"),
		all_brightness_full_press_hold : this.setInstruction("B5")
	};	
	this.action_set={
//		self:this,
		on:function(){},
		off:function(){},
		full_brightness:function(){
			self.sendMessage(self.instruction_set.all_on,100);
			self.sendMessage(self.instruction_set.all_brightness_full_press_hold,200);
		},
		night:function(){
			self.sendMessage(self.instruction_set.all_on,100);
			self.sendMessage(self.instruction_set.night_mode_all,200);
		},
		blink:function(interval)
		{
			var interval = interval || 500;
			self.sendMessage(self.instruction_set.all_on,100);
			self.sendMessage(self.instruction_set.all_off,100+interval);
			self.sendMessage(self.instruction_set.all_on,100+interval*2);
			self.sendMessage(self.instruction_set.all_off,100+interval*3);
			self.sendMessage(self.instruction_set.all_on,100+interval*4);
			self.sendMessage(self.instruction_set.all_off,100+interval*5);
			self.sendMessage(self.instruction_set.all_on,100+interval*6);
		},
		bulb:function(interval)
		{
			var interval = interval || 100;
			for(var i=0;i<22;i+=1)
				self.sendMessage(self.instruction_set.warmer,interval*i);
		},
		white:function()
		{
			var interval = interval || 100;
			for(var i=0;i<22;i+=1)
				self.sendMessage(self.instruction_set.cooler,interval*i);
		},
		brightest:function(interval)
		{
			for(var i=0;i<22;i+=1)
				self.sendMessage(self.instruction_set.brightness_up,interval*i);
		},
		darkest:function(interval)
		{
			for(var i=0;i<22;i+=1)
				self.sendMessage(self.instruction_set.brightness_down,interval*i);
		},
	};
	this.key_set = (function(){
		var array=[];
		for(var key in self.action_set)
			array.push(key);
//		for(var key in self.instruction_set)
//			array.push(key);
		return array;
	})();
	this.action = function(action,time,interval)
	{
		var self=this;
		var action = action;
		var time = time;
		if(typeof time == typeof "")
			time = +time;
		sleep.sleep(time,function(){
			for(var key in self.instruction_set)
			{
				if(action == key)
					self.sendMessage(self.instruction_set[key]);
			}
			for(var key in self.action_set)
			{
				if(action == key)
					self.action_set[key](interval);
			}
		});
	}

}

//-----------------------------------------------------------------------------


