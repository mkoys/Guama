module.exports = {
    port: 8000, // Port that application will be served on
    dbString: "mongodb://localhost:27017", // Mongo Database connection string
    dbName: "guama", // Database to set in connection
    usernameLength: 4, // Minimum lenght of username
    passwordLength: 8, // Minimum lenght of password
    passwordCapitalized: false,
    passwordSpecial: false,
    passwordSpecialRegex: /[$&+,:;=?@#|'<>.^*()%!-]/g,
    saltRounds: 10,
    defaultBio: "",
    defaultAvatar: "",
    generateId: () => {
        return new Date().getTime();
    }
}