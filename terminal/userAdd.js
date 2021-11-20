// Import and start terminal using Terminal-kit
const terminal = require("terminal-kit").terminal;

const checkRegister = require("../auth/schema/checkRegister.js");
const createUser = require("../auth/database/createUser.js");

module.exports = async function userAdd(callback) {
	let userDetails = {
		id: null,
		bio: null,
		email: null,
		avatar: null,
		status: null,
		username: null,
		password: null,
		profile: null,
	}

	let keys = Object.keys(userDetails);
	let counter = 0;

	terminal("\n");
	getInfo();

	async function getInfo() {
		terminal.blue("\n%s:", keys[counter]);
		let userInput = await terminal.inputField().promise;
		userDetails[keys[counter]] = userInput;
		counter++;

		if (counter == keys.length) {
			const check = await checkRegister(userDetails);

			if (check.code == 400) {
				if (check.messages.length > 0) {
					check.messages.forEach(msg => {
						terminal.red("\n%s", msg);
					});
					terminal("\n");
				} else {
					terminal.red("\nBad input!\n");
				}
				callback();
			} else {
				createUser(userDetails, 1);
				terminal.green("\nAdded user with username ");
				terminal.white.bold("%s", userDetails.username);
				terminal.green(" succesfully.\n");
				callback();
			}
		} else {
			getInfo();
		}
	}
}