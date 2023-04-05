// index.js
const express = require('express');

const app = express();
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
});

app.get("/", (req, res) => {
	res.json({ message: "Hello from server!" });
});

app.get("/test", (req, res) => {
	res.json({ message: "Hello from test server!" });
});

app.post('/login', (req, res) => {
	const { username, password } = req.body;
	console.log("login: ", username, password);
	const users = jsonData.users;
	let currentUser, result;
	if(users.length > 0){
		result = users.map(current => {
			if (current.username == username && current.password == password) {
				return current;
			}
		});
		currentUser = result[0];
	}
	// Check if email and password are valid
	console.log(currentUser);
	if (typeof(currentUser) != "undefined") {
		delete currentUser.password;
		res.status(200).send({ message: 'Login successful', user: currentUser });
	} else {
		res.status(200).send({ message: 'Invalid email or password' });
	}
});

app.post('/createuser', (req, res) => {
	console.log(req);
	const { user } = req.body;
	console.log(user);
	const users = jsonData.users;
	console.log(users);
	const isUser = (users.length > 0 ? users.map(current => {
		if (current && current.username == user.username) {
			return true;
		}
	}) : false);

	if (!isUser) {
		const date = Date();
		user.createdAt = date;
		user.updatedAt = date;
		console.log(user);
		console.log(jsonData);
		console.log(Array.isArray(jsonData.users));
		if (Array.isArray(jsonData.users)) {
			jsonData.users.push(user);
		} else {
			jsonData.users = [user];
		}

		fs.writeFile("data.json", JSON.stringify(jsonData),
		function(err, result) {
			if(err) console.log('error', err);
		});
		res.status(200).send({ message: 'User Created.' });
	}
	else {
		res.status(200).send({ message: 'User Already Exist.' });
	}
});

// Export the Express API
module.exports = app;