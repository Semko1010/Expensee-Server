const { createNewUser, checkEmailExists } = require("../db_access/user_dao");
const { hashPassword } = require("../utility/pwHash");

async function registerUser({
	username,
	email,
	password,
	userImg,
	gesamtVermoegen,
}) {
	//checkEmailExist
	const foundUser = await checkEmailExists(email);

	if (foundUser) {
		console.log("user Exist! Please Log in!");
		throw new Error("User with this Email already exist. Please log in!");
	}
	// create passwordHash
	const passwordHash = hashPassword(password);
	//create NewUser
	const newUser = {
		username,
		email,
		passwordHash,
		userImg,
		gesamtVermoegen,
	};
	const insertResult = await createNewUser(newUser);
	if (!insertResult.acknowledged) {
		throw new Error("Failed to create new User");
	}
	return;
}

module.exports = {
	registerUser,
};
