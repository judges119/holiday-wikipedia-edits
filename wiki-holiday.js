var WebSocket = require('ws');
var ws = new WebSocket('ws://wikimon.hatnote.com/en/');

var globes = new Uint8Array(160);

for (i = 0; i < 160; i++) {
	globes[i] = 0;
}


ws.on('message', function(data, flags) {
	var dgram = require('dgram');
	socket = dgram.createSocket('udp4');
	
	globes[Math.round(Math.random() * 149) + 11] = 255;
	globes[Math.round(Math.random() * 149) + 11] = 0;
	
	var message = new Buffer(globes);
	
	socket.send(message, 0, message.length, 9988, "192.168.0.115");
});
