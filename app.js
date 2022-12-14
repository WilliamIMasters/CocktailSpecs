const db = require("./database.js");

let express = require("express");
let app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 80;

app.get("/", function(req,res) {
  res.sendFile("views/index.html", {root: __dirname});
});

app.get("/NewCocktail", function(req,res) {
  res.sendFile("views/newCocktail.html", {root: __dirname});
});



io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("getData", () => {
    console.log("User requested Data");

    db.getAllData().then( (newData) => {
      // Return Data
      console.log("newData:" + newData);
      socket.emit("Data", newData);
    });


  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("newCocktail", (data) => {
    if(data.password == "Redan") {
      console.log("Password Okay");
      db.insertNewCocktail(data.specs);
    }
  });
});

server.listen(port, () => {
  console.log('listening on *:' + port);
});

//
// process.on('SIGTERM', () => {
//     console.log("Close Server");
//
// });
