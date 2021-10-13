module.exports = {
    port: 8000, // Port that application will be served on
    dbString: "mongodb://localhost:27017", // Mongo Database connection string
    dbName: "guama", // Database to set in connection
    usernameLength: 4, // Minimum lenght of username
    passwordLength: 8, // Minimum lenght of password
    passwordCapitalized: true, // Require at least one capitalized letter in password
    passwordSpecial: false, // Require special character in password
    passwordSpecialRegex: /[$&+,:;=?@#|'<>.^*()%!-]/g, // Regex to test sepecial character
    saltRounds: 10, // Salt rounds to generate password hash
    defaultBio: "", // Default user bio on reservation
    defaultAvatar: "", // Default user avatar on registration
    tokenLength: 21, // Length of token to generate
    generateId: () => { // Function to generate user id based on return
        return new Date().getTime();
    }
}