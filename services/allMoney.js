const { _getDB } = require("../db_access/_getDB");
const ObjectId = require("mongodb").ObjectId;

async function allMoney(userObjId, amount) {
	const db = await _getDB();
	const userFavorite = await db.collection("users").updateOne(
		{
			_id: new ObjectId(userObjId),
		}, //welche Object_id soll geupdated werden
		{ $set: { gesamtVermoegen: amount } }, // was soll geupdatet werden ohne {} wird direkt der String gepushed
	);
	return userFavorite;
} //funktioniert

module.exports = {
	allMoney,
};
