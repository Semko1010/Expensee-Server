const ObjectId = require("mongodb").ObjectId;
const { _getDB } = require("./_getDB");

//create new User
async function createNewUser(user) {
	const db = await _getDB();
	const newUser = await db.collection("users").insertOne(user);
	return newUser;
}
//Check Name or email exist, User vorhanden in Datenbank
async function checkEmailExists(email) {
	const db = await _getDB();
	const user = await db.collection("users").findOne({
		$or: [{ email: email }],
	});

	return user;
}
//get user
async function findOneUser(id) {
	const db = await _getDB();
	const foundUser = await db
		.collection("users")
		.findOne({ _id: new ObjectId(id) });
	const favorites = foundUser;

	return favorites;
}
async function getAmounts(userobjid) {
	const db = await _getDB();
	const amount = await db.collection(`amount/${userobjid}`).find().toArray();

	return amount;
}

//addProduct
async function addAmount(amount) {
	const db = await _getDB();
	const Product = await db
		.collection(`amount/${amount.token.userObjId}`)
		.insertOne(amount);
	return Product;
}
//user.object_id

module.exports = {
	createNewUser,
	checkEmailExists,
	addAmount,
	findOneUser,
	getAmounts,
};
