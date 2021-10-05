module.exports = function(data) {
    if (!Array.isArray(data) && typeof data === "object") {
        return true;
    }else {
        return false;
    }
}