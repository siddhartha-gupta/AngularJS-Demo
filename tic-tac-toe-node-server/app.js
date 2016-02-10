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
		getPlayersList(socket);
	});

	socket.on('add-recipient', function(data) {
		addRecipient(data);
	});

	socket.on('send-message', function(data) {
		sendMessage(data);
	});

	//Removing the socket on disconnect
	socket.on('disconnect', function() {
		disconnectClient(socket);
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
		players = providePlayersList();

		io.sockets.emit('current-players-list', players);
	} else {
		resp = 'Email id is already in use';
	}
	// Send resp back to user
	socket.emit('register-email-resp', resp);
}

function providePlayersList() {
	var list = [];
	for (var key in clients) {
		list.push({
			username: clients[key].username,
			emailId: key
		});
	}
	return list;
}

function getPlayersList(socket) {
	var playersList = providePlayersList();
	socket.emit('current-players-list', playersList);
}

function addRecipient(data) {
	var resp = '';

	if (clients.hasOwnProperty(data.emailId)) {
		clients[data.emailId].recipient = data.recipient;
		clients[data.recipient].recipient = data.emailId;
		console.log(clients);
		resp = 'Recipient added successfully';
	} else {
		resp = 'Error in adding recipient';
	}
	io.sockets.connected[clients[data.recipient].socket].emit('add-recipient-resp', data.emailId);
	io.sockets.connected[clients[data.emailId].socket].emit('add-recipient-resp', data.recipient);
}

function sendMessage(data) {
	console.log("time to send msg: ", data);

	if (clients[data.recipient]) {
		console.log('sending to: ', clients[data.recipient]);
		io.sockets.connected[clients[data.recipient].socket].emit('send-message-resp', data.msg);
	} else {
		console.log("User does not exist: " + data.recipient);
	}
}

function disconnectClient(socket) {
	for (var name in clients) {
		if (clients[name].socket === socket.id) {
			delete clients[name];
			break;
		}
	}
}
