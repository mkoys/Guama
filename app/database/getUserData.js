// Import settings
const settings = require("../../settings.js");

// Import database connection
const mongodb = require("../../connect.js");

// Import getID from token
const { getId } = require("../../session.js");

// Gets users status
const getStatus = require("../functions/getStatus.js");

// Findes and parses user based on given token or id and authority
module.exports = async function getUserData(token, id, permissions) {

  // Items to delte from found user
  const deleteArray = ["passcode", "_id", "username"];

  // Values to return if private profile
  const notPrivate = ["displayName", "avatar", "id", "profile"];

  // Values to delete if public profile
  const notPublic = ["email", "status"];

  // Get database
  const database = mongodb.get();

  // Set database collection to users
  const users = database.collection("users");

  // Inser user to database
  const foundUser = await users.findOne({ id: token ? getId(token) : parseInt(id) });

  // If no found user return error
  if (!foundUser) {
    return { error: "No user found" }
  }

  // Permissions flags check and store
  if (permissions) {
    // Inherit flag
    if (permissions.inherit) {

      // Check profile setting
      switch (foundUser.profile) {

        // Private profile data delete
        case "private":
          // Values to return if private profile
          const notPrivate = ["displayName", "avatar", "id", "profile"];
          // Loop over each object in found user
          Object.keys(foundUser).forEach(key => {
            // If we find key in non delete Array do not delete them
            if (notPrivate.indexOf(key) == -1) {
              // Push key to delete array 
              deleteArray.push(key);
            }
          });
          break;

        // Public profile data delete
        case "public":
          // Loop over each object in not public
          notPublic.forEach(value => {
            // Append vlue to delete array
            deleteArray.push(value);
          });
          break;
      }
    }
  }

  // Get users true status
  const status = getStatus(token, id);

  // Set main status from database else set custom status
  if (status === "Offline") {
    foundUser.status = status;
  } else {
    foundUser.status ? "" : foundUser.status = status;
  }

  // Loop over each delte item and delte it
  for (let x = 0; x < deleteArray.length; x++) {
    delete foundUser[deleteArray[x]];
  }

  // Return parsed user
  return foundUser;
}