const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const discoveryRoutes = require("./routes/discoveryRoute");
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: "true" }));

app.use("/", discoveryRoutes);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`App UI available http://localhost:${port}`);
});
