const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = 3030;
app.use(express.json({ limit: "16mb" }));

//import functions
const { registerUser } = require("./services/registerUser");
const { allMoney } = require("./services/allMoney");
const { LoginUser } = require("./services/loginUser");
const { addAmount, getAmounts, findOneUser } = require("./db_access/user_dao");
//grobal uses
dotenv.config();

//Post Routes
app.post("/api/expensee/users/register", (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const userImg = req.body.userImg;
	const password = req.body.password;
	const gesamtVermoegen = req.body.zusammen;
	registerUser({ username, email, password, userImg, gesamtVermoegen })
		.then(() => {
			res.send({ userExist: false });
		})
		.catch(err => {
			res.send({ userExist: true });
		});
});

app.post("/api/expensee/users/login", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	LoginUser({ email, password })
		.then(token => {
			res.send({ userExist: true, token });
		})
		.catch(err => {
			res.send({ userExist: false });
		});
});

app.post("/api/expensee/users/amount", (req, res) => {
	addAmount(req.body).then(res.send({ amountAdded: true }));
	const userObjId = req.body.token.userObjId;
	const amount = req.body.zusammen;
	console.log(amount);
	allMoney(userObjId, amount);
});

//get Routes
app.get("/api/expensee/users/allAmounts", (req, res) => {
	getAmounts(req.headers.userobjid).then(amounts => {
		res.send(amounts);
	});
});
app.get("/api/expensee/users/allUsers", (req, res) => {
	findOneUser(req.headers.userobjid).then(userImage => {
		res.send(userImage);
	});
});

app.listen(PORT, () => console.log("Server runs on Port:", PORT));
