const express = require('express');
const router = express.Router();
const { Chat } = require("../models/Chat");

const { auth } = require("../middleware/auth");
const multer = require('multer');


router.get("/getChats",async (req, res) => {
    await Chat.find()
        .populate("sender")
        .exec((err, chats) => {
            console.log(chats)
            if(err) return res.status(400).send(err);
            res.status(200).send(chats)
        })
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'chatUploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    },
    // fileFilter: (req, file, cb) => {
    //   const ext = path.extname(file.originalname)
    //   if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
    //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    //   }
    //   cb(null, true)
    // }
  })
   
  var upload = multer({ storage: storage }).single("file")
  
  router.post("/chatUploads", auth ,(req, res) => {
    upload(req, res, err => {
      if(err) {
        return res.json({ success: false, err })
      }
      return res.json({ success: true, url: res.req.file.path });
    })
  });
  
  
module.exports = router;