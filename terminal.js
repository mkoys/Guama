const terminal = require('terminal-kit').terminal;

let history = [];
const autoComplete = [];

const term = function () {

	terminal.yellow("Guama").red(" $ ", );

	terminal.inputField(
		{ history: history, autoComplete: autoComplete, autoCompleteMenu: true },
		(err, arg) => {
			history.push(arg);

			switch (arg) {
				case "exit":
					return terminal.processExit();
					break;
				case "clear":
					terminal.clear();
					break;
				default:
					terminal.green("\nCommand entered").red(" '%s'\n", arg);
					break;
			}

			term();
		}
	);
}

module.exports = term;