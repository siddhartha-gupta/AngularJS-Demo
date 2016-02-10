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
	socket.on('register-email', function(data) {
		registerEmail(socket, data);
	});

	socket.on('get-players-list', function(data) {
		var playersList = getPlayersList();
		socket.emit('current-players-list', playersList);
	});

	socket.on('add-recipient', function(data) {
		var resp = '';

		if (clients.hasOwnProperty(data.emailId)) {
			clients[data.emailId].recipient = data.recipient;
			clients[data.recipient].recipient = data.emailId;
			console.log(clients);
			resp = 'Recipient added successfully';
		} else {
			resp = 'Error in adding recipient';
		}
		// Send resp back to user
		// socket.emit('add-recipient-resp', resp);
		io.sockets.connected[clients[data.recipient].socket].emit('add-recipient-resp', data.emailId);
		io.sockets.connected[clients[data.emailId].socket].emit('add-recipient-resp', data.recipient);
	});

	socket.on('send-message', function(data) {
		console.log("time to send msg: ", data);
		console.log("clients: ", clients);

		if (clients[data.recipient]) {
			console.log('sending to: ', clients[data.recipient]);
			io.sockets.connected[clients[data.recipient].socket].emit('send-message-resp', data.msg);
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

function registerEmail(socket, data) {
	var resp = '',
		players;

	if (!clients.hasOwnProperty(data.emailId)) {
		clients[data.emailId] = {
			'socket': socket.id,
			'username': data.username
		};
		console.log(clients);
		resp = 'Email registered successfully';
		players = getPlayersList();

		io.sockets.emit('current-players-list', players);
	} else {
		resp = 'Email id is already in use';
	}
	// Send resp back to user
	socket.emit('register-email-resp', resp);
}

function getPlayersList() {
	var list = [];
	for (var key in clients) {
		list.push({
			username: clients[key].username,
			emailId: key
		});
	}
	return list;
}
