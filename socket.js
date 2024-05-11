const io = require("socket.io");
// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("A client connected");

  // Handle order status update event
  socket.on("orderStatusUpdate", (data) => {
    // Broadcast the order status update to all connected clients
    io.emit("orderStatusUpdate", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});
