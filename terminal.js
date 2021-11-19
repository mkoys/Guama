// Import and start terminal using Terminal-kit
const terminal = require('terminal-kit').terminal;

// History of commands array
let history = [];
// Autocompletion array
const autoComplete = ["exit", "clear"];

// Start terminal
function init() {
	command();
}

// Print's message of the day
function motd() {
		terminal.green("Guama Terminal v0.0.1\n");
}

// Command field function
const command = function () {

	// Prompt print
	terminal.yellow("Guama").red(" $ ");

	// Actual input of user
	terminal.inputField(
		{ history: history, autoComplete: autoComplete, autoCompleteMenu: true, autoCompleteHint: true },
		(err, arg) => {
			// Add command to history
			history.push(arg);

			// Switch for diffrent commands
			switch (arg) {
				// Exit program
				case "exit":
					return terminal.processExit();
					break;
				// Clear console
				case "clear":
					terminal.clear();
					break;
				default:
					break;
			}

			// Set new line
			terminal("\n");

			// Loop command input
			command();
		}
	);
}

// Export terminal fucntions
module.exports = {init, motd};