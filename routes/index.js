var express = require('express');
const multer = require('multer');
var router = express.Router();
const path = require('path');
const upload = require('../upload');

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const attach = multer({ 
    storage: storage, 
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 25 }
 });

router.get('/', (req, res) => {  
    res.sendFile(path.join(__dirname, '../templates/index.html'));
});

router.post('/upload', attach.single('file'), (req, res) => {  
    const file = req.file;

    upload(file)
        .then((url) => {
            res.redirect("/")
        })
        .catch((err) => res.status(500).send(err));
});

module.exports = router;
