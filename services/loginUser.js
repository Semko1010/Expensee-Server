const jwt = require("jsonwebtoken");
const { checkEmailExists } = require("../db_access/user_dao");
const { hashPassword } = require("../utility/pwHash");

//generiere Token
const generateToken = user => {
	//Gültigkeitsdauer
	const Now = Date.now() / 1000;
	const expiresAt = 24 * 60 ** 2;
	const tokenExpired = Now + expiresAt;
	//Usertoken
	const token = jwt.sign(
		{
			sub: user._id,
			iat: Now,
			exp: tokenExpired,
			type: "access_token",
		},
		process.env.JWT_SECRET,
	);
	return token;
};

async function LoginUser({ email, password }) {
	//email-Input mit Datenbank abgleichen
	const foundUser = await checkEmailExists(email);

	if (!foundUser) {
		throw new Error("User not found.");
	}
	//pw-Input abgleichen
	const passwordHash = hashPassword(password);
	//wenn pw übereinstimmt,dann....
	const pwIsCorrect = foundUser.passwordHash === passwordHash;
	if (!pwIsCorrect) {
		throw new Error("Sorry! No Match for Email and Password");
	}
	//else generiere token
	const token = generateToken(foundUser);
	const userObjId = foundUser._id;
	console.log("LoginUser", { token: token, id: foundUser._id });
	return { token, userObjId };
}

module.exports = { LoginUser };
