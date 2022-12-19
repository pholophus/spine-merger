const express = require('express')
const path = require('path')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const multer = require('multer')
const fs = require("fs");

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/fileupload', multer().single('file'), (req, res) => {
  // res.sendFile(__dirname + '/index.html');
  console.log(req)
  console.log(req.file)
  fs.writeFile("public/result/Oasis_spine_1.0_3.png", req.file.buffer, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
});

io.on('connection', (socket) => {
  socket.on('chat message trigger', msg => {
    io.emit('chat message receiver', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
