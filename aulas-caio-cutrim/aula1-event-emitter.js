/// <reference path="typings/node/node.d.ts"/>
//Node aula #1 Introdução ao Event Emitter Pattern
var EventEmitter 	= require('events').EventEmitter,
	util			= require('util'),
	time,
	event;
	
function MyEvent() {
	
	if(!this instanceof MyEvent)
		return new MyEvent();
	
	EventEmitter.call(this);
	
	var self = this;
	setInterval(function intervalCallback(){
		self.emit('myEvent', 'Hello World', 1);
	},1000);	
}

util.inherits(MyEvent, EventEmitter);

time = Date.now();
event = new MyEvent();
event.on('myEvent', function(stringEvent, numberEvent){
	console.log("myEvent triggered", stringEvent, numberEvent, Date.now() - time);
});