const handle = require('./app/server')
const socket  = require('./app/common/socket');
// const socketJob = require('./app/common/socketJobs')
const httpServer = require("http").createServer(handle)
socket.connect(httpServer);
// const io = require("socket.io")(httpServer, {
//   cors: {
//     origin: "http://localhost:5001",
//     methods: ["GET", "POST"]
//   }
// });
require('dotenv').config()
const port = process.env.PORT || 3000


// io.on("connection", (socket) => {
//   console.log('socket connected!');
//   socket.join("6357e468a9208095bd6b1b18")
//   socket.on('sendMsgToServer', (msg) => {
//     socket.emit('recieve-msg', msg)
//   })
// });

// let connection = socket.connection();
// if(connection?.socket){
//   connection.emit('recieve-msg', "msg from server");
// }

app.use(express.static(path.join(__dirname, "/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
});

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
