const express = require('express');
const router = express.Router();
const { Coach } = require("../models/Coach");
const multer = require('multer');

const { auth } = require("../middleware/auth");
const {admin} = require("../middleware/admin")


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'coachUploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


router.post("/uploadImage", auth, (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});



router.post("/uploadCoach", auth, (req, res) => {

    //save all the data we got from the client into the DB 
    const coach = new Coach(req.body)

    coach.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

// router.post("/uploadCoach/:id", auth, (req, res) => {

//     //save all the data we got from the client into the DB 
//     const coach = new Coach(req.body)
//     let query = {_id: req.params.id }
//     coach.update((query, err) => {
//         if (err) return res.status(400).json({ success: false, err })
//         return res.status(200).json({ success: true })
//     })

// });


router.post("/getCoaches", (req, res) => {

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    let findArgs = {};
    let term = req.body.searchTerm;

    for (let key in req.body.filters) {

        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    console.log(findArgs)

    if (term) {
        Coach.find(findArgs)
            .find({ $text: { $search: term } })
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, coaches) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, coaches, postSize: coaches.length })
            })
    } else {
        Coach.find(findArgs)
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, coaches) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, coaches, postSize: coaches.length })
            })
    }

});


router.get("/coaches_by_id", (req, res) => {
    let type = req.query.type
    let coachIds = req.query.id

    if (type === "array") {
        let ids = req.query.id.split(',');
        coachIds = [];
        coachIds = ids.map(item => {
            return item
        })
    }

    Coach.find({ '_id': { $in: coachIds } })
    .populate('writer')
    .exec((err, coach) => {
        if(err) return req.status(400).send(err)
        return res.status(200).send(coach)
    })
});


// router.delete('/coaches_by_id', (req, res) => {
//     Coach.findById(req.params.id)
//     .then(coach => coach.remove((err) => {
//         if (err) return res.status(400).json({ success: false, err })
//         return res.status(200).json({ success: true })
//     }))
// })


// router.post("/getCoach", (req, res) => {

//     Coach.findById({ "_id" : req.body.coachId })
//     .remove((err) => {
//         if (err) return res.status(400).json({ success: false, err })
//         return res.status(200).json({ success: true })
//     })
// })

// router.post("/deleteCoach", (req, res) => {


//     Coach.findByIdAndDelete({ "_id" : req.body.coachId })
//     .remove((err) => {
//         if (err) return res.status(400).json({ success: false, err })
//         return res.status(200).json({ success: true })
//     })
// });

// router.delete('/deleteCoach:id', (req, res) => {
//     Coach.findByIdAndRemove(req.params.id, function (err, user) {
//       if (err) return res.status(400).send("There was a problem deleting the user.");
//       res.status(200).send("User: deleted.");
//     });
//   });

// router.delete('/deleteCoach', (req, res) => {
//     let coachIds = req.query.id
//     Coach.findOneAndDelete({ '_id': { $in: coachIds } })
    
//     .exec((err, coach) => {
//         if(err) return req.status(400).send(err)
//         return res.status(200).send(coach)
//     })
// })
// router.delete("/coaches_by_id", (req, res) => {

//     let variable = { _id: req.body.coachId}
    
//     Coach.findOneAndDelete(variable)
//         .exec((err, result) => {
//             if (err) return res.status(400).json({ success: false, err })
//             res.status(200).json({ success: true })
//         })

// })

// router.delete("/coaches_by_id", (req, res) => {
//     let type = req.query.type
//     let coachIds = req.query.id

//     if (type === "array") {
//         let ids = req.query.id.split(',');
//         coachIds = [];
//         coachIds = ids.map(item => {
//             return item
//         })
//     }

//     Coach.findOneAndDelete({ '_id': { $in: coachIds } })
//     .populate('writer')
//     .exec((err, coach) => {
//         if(err) return req.status(400).send(err)
//         return res.status(200).send(coach)
//     })
// });


module.exports = router;