var WebSocket = require('ws'); //Require ws Websockets package
var ws = new WebSocket('ws://wikimon.hatnote.com/en/'); //Open websocket to Wikipedia edit stream

var dgram = require('dgram'); //Require datagram package (built in to Node.js)
var socket = dgram.createSocket('udp4'); //Create a datagram socket to send from

var globes = new Uint8Array(160); //Create array of globes

//Clear all globes to black/off
for (i = 0; i < 160; i++) {
	globes[i] = 0;
}

//Upon receiving a message
ws.on('message', function(data, flags) {
	light = Math.round(Math.random() * 49) * 3 + 10; //Choose a random light
	//Set the RGB colour of that light
	globes[light] = Math.round(Math.random() * 256);
	globes[light + 1] = Math.round(Math.random() * 256);
	globes[light + 2] = Math.round(Math.random() * 256);
	//Clear two random lights to keep it looking like it's twinkling changing
	globes[Math.round(Math.random() * 149) + 11] = 0;
	globes[Math.round(Math.random() * 149) + 11] = 0;
	
	var message = new Buffer(globes); //Create a datagram message from the array of globe values
	
	//Send the datagram containing globe values
	socket.send(message, 0, message.length, 9988, "192.168.0.115", function(err, bytes) { 
		if (err) { //If datagram sending errors...
			console.log(err); //Log error to console
		}
	});
});
