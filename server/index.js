const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");
const { Chat } = require("./models/Chat");


const { auth } = require("./middleware/auth");
const {admin} = require("./middleware/admin")
const server = require("http").createServer(app);
const io = require("socket.io")(server)





io.on("connection", socket => {

  socket.on("Input Chat Message", msg => {

    connect.then(db => {
      try {
          let chat = new Chat({ message: msg.chatMessage, sender:msg.userId, type: msg.type })

          chat.save((err, doc) => {
            console.log(doc)
            if(err) return res.json({ success: false, err })

            Chat.find({ "_id": doc._id })
            .populate("sender")
            .exec((err, doc)=> {

                return io.emit("Output Chat Message", doc);
            })
          })
      } catch (error) {
        console.error(error);
      }
    })
   })

})

// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log("DB connected"))
//   .catch(err => console.error(err));

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/video', require('./routes/video'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/subscribe', require('./routes/subscribe'));
app.use('/api/like', require('./routes/like'));

app.use('/api/product', require('./routes/product'));
app.use('/api/coach', require('./routes/coach'));
app.use('/api/chat', require('./routes/chat'));


const {sendEmail} = require('./mail');
app.post("/api/sendMail", (req,res) => {
  sendEmail(req.body.email, req.body.name, "hello")
})



//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));
app.use('/picuploads', express.static('picuploads'));
app.use('/coachUploads', express.static('coachUploads'));
app.use('/chatUploads', express.static('chatUploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server Running at ${port}`)
});