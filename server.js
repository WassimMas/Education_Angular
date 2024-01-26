const http = require("http");
const app = require("./backend/app");

// Get the port from the environment or use a default (e.g., 3000)
const port = process.env.PORT || 3000;
app.set("port", port);

// Create a server and pass the Express app to it
const server = http.createServer(app);

// Listen on the specified port
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle server errors
server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

// Event listener for when the server is started
server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
});
