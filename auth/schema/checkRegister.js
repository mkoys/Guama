const settings = require("../../settings.js");

const isObject = require("../../utils/isObject.js");

module.exports = function (data) {
    let result = {
        code: 200,
        messages: []
    }

    if (!isObject(data)) {
        result.code = 400;
        return result;
    }

    if (!data.username || !data.email || !data.password) {
        result.code = 400;
        return result;
    }

    if (typeof data.username !== "string" || typeof data.email !== "string" || typeof data.password !== "string") {
        result.code = 400;
        return result;
    }

    if(data.username.length <= settings.usernameLength) {
        result.code = 400;
        result.messages.push("Username is too short");
    }

    if(!data.email.includes("@")) {
        result.code = 400;
        result.messages.push("Email must be valid");
    }

    if(data.password.length <= settings.passwordLength) {
        result.code = 400;
        result.messages.push("Password is too short");
    }

    return result;
}