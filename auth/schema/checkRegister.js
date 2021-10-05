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

    return result;
}