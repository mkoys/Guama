// Import settings
const settings = require("./settings.js");

// Import Native HTTP node module
const http = require("http");

// Import Express
const express = require("express");

// Import Socket
const socketIo = require("./socket.js");

// Import Express middleware
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

// Import connection call
const mongodb = require("./connect.js");

// Import in router
const router = require("./router.js");

// Import terminal
const terminal = require("./terminal.js");

// Initialize Database connection
mongodb.init();

// Create Express, HTTP and Socket server instances
const app = express();
const server = http.createServer(app);
const io = socketIo.init(server);

// Flag checking
// Checks if we got any flags
if (process.argv[2]) {
    // Split all flags and then pass them to command swtch
    process.argv[2].split("").forEach(flag => {
        switch (flag) {
            // Terminal Flag
            case "t":
                terminal.motd(); // Shows terminal motd
                terminal.init(); // Inits terminal
                break;
        }
        switch (flag) {
            // Debug Flag
            case "d":
                app.use(morgan("tiny")); // Small HTTP logger
                break;
        }
    });
}

// Use express middleware 
app.use(express.json()); // JSON parser
app.use(helmet()); // Set's some headers to be more secure
app.use(cors()); // Set's Cross Origin Access Headers

// Use router as global Router
app.use("/", router);

// GET Route hello world
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Constant for port
const port = settings.port || 8000;

// Server listen on port and log message
server.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});
