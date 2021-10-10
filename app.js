// Import settings
const settings = require("./settings.js");

// Import Native HTTP node module
const http = require("http");

// Import Socket
const { Server } = require("socket.io");

// Import Express
const express = require("express");

// Import Express middleware
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

// Import connection call
const mongodb = require("./connect.js");

// Import in router
const router = require("./router.js");

// Initialize Database connection
mongodb.init();

// Create Express, HTTP and Socket server instances
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Use express middleware 
app.use(express.json()); // JSON parser
app.use(helmet()); // Set's some headers to be more secure
app.use(cors()); // Set's Cross Origin Access Headers
app.use(morgan("tiny")); // Small HTTP logger

// Use router as global Router
app.use("/", router);

// GET Route hello world
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Constant for port
const port = settings.port || 8000;

// Server listen on port and log message
server.listen(port, () => {console.log(`Running on http://localhost:${port}`)});
