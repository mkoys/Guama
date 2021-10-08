// Import settings
const settings = require("../../settings.js");

// Import utils
const isObject = require("../../utils/isObject.js");

// Import database call
const duplicateEmail = require("../database/duplicateEmail.js");

module.exports = async function (data) {
    // Set regex test for special character
    const specialCharTest = new RegExp(settings.passwordSpecialRegex);
    let capitalized = false; // Capitalized variable

    // Result store
    let result = {
        code: 200,
        messages: []
    }

    // Test if data is object else return with bad content 400
    if (!isObject(data)) {
        result.code = 400;
        return result;
    }

    // Test if username, email, password exist else return with bad content 400
    if (!data.username || !data.email || !data.password) {
        result.code = 400;
        return result;
    }

    // Test if username, email, password are string else return with bad content 400
    if (typeof data.username !== "string" || typeof data.email !== "string" || typeof data.password !== "string") {
        result.code = 400;
        return result;
    }

    // Test if username length is more than enaught else set result with bad content 400 and message
    if (data.username.length <= settings.usernameLength) {
        result.code = 400;
        result.messages.push("Username is too short");
    }

    // Test if email is email else set result with bad content 400 and message
    if (!data.email.includes("@")) {
        result.code = 400;
        result.messages.push("Email must be valid");
    }

    // Test if password length is more than enaught else set result with bad content 400 and message
    if (data.password.length <= settings.passwordLength) {
        result.code = 400;
        result.messages.push("Password is too short");
    }

    // Capitalized char test setting check
    if (settings.passwordCapitalized) {
        // Test if password has capitalized char if yes set capitalized to true and break
        for (let x = 0; x < data.password.length; x++) {
            // Capitalized chars code check
            if (data.password.charCodeAt(x) < 65 || data.password.charCodeAt(x) > 90) {
                capitalized = true;
                break;
            }
        }

        // Error result set
        if (!capitalized) {
            result.code = 400;
            result.messages.push("Password must have at least one capital character");
        }
    }

    // If we have no error code from check create user with data
    if (result.code == 200) {
        // Checks if email isn't aready in use as it is main identification to account
        const foundEmail = await duplicateEmail(data);

        // Check if email in use
        if (foundEmail) {
            // Set reutn code and message
            result.code = 400;
            result.messages.push("Email already in use");
        }
    }

    // Regex test for special character with settings check and error result set
    if (settings.passwordSpecial) {
        if (!specialCharTest.test(data.password)) {
            result.code = 400;
            result.messages.push("Password must have at least one special character");
        }
    }

    // Return result
    return result;
}