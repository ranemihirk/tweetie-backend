const express = require("express");
const app = express();
const user = require("./api/user");

app.use(express.json({extended: false}));

app.use("/api/user", user);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});