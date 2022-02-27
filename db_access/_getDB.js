const { MongoClient } = require("mongodb");
require("dotenv").config();

let _db;

async function _getDB() {
	if (_db) {
		return _db;
	} else {
		const url = process.env.DB_URL;
		const client = new MongoClient(url);

		const connected_client = await client.connect();
		_db = connected_client.db("expensee");
	}
	return _db;
}

module.exports = {
	_getDB,
};
