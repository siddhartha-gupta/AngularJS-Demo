var http = require('http'),
	connect = require('connect'),
	serveStatic = require('serve-static'),
	app = connect(),
	io = null,
	fs = require('fs')

app.use(serveStatic(__dirname));

var server = http.createServer(app);
io = require('socket.io').listen(server);
server.listen(5000);

var clients = {};

io.sockets.on('connection', function(socket) {
	socket.on('create-join-room', function(data) {
		clients[data.username] = {
			"socket": socket.id,
			"recipient": data.recipient
		};
		console.log(clients);
	});

	socket.on('private-message', function(data) {
		console.log("time to send private-message: ", data);
		console.log("clients: ", clients);

		if (clients[data.recipient]) {
			io.sockets.connected[clients[data.recipient].socket].emit("add-message", data);
		} else {
			console.log("User does not exist: " + data.recipient);
		}
	});

	//Removing the socket on disconnect
	socket.on('disconnect', function() {
		for (var name in clients) {
			if (clients[name].socket === socket.id) {
				delete clients[name];
				break;
			}
		}
	})
});
