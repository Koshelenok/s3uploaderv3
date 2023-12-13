var express = require('express');
var router = express.Router();
const path = require('path');

const attach = require('../services/multer');

const s3Upload = require('../services/s3/upload');
const s3Delete = require('../services/s3/delete');
const s3Read = require('../services/s3/read');


router.get('/', (req, res) => {  
    res.sendFile(path.join(__dirname, '../templates/index.html'));
});

router.get('/read', attach.single('file'), (req, res) => {  
    const params = req.query;
    const {filename} = params;


    s3Read(filename)
        .then((data) => {
            console.log("success read", data.VersionId);
            data.Body.pipe(res);
        })
        .catch((err) => {
            res.status(500).send('Something went wrong. ' + err)
        });
});


router.post('/upload', attach.single('file'), (req, res) => {  
    const file = req.file;

    s3Upload(file)
        .then((data) => {
            console.log("success upload");
            res.redirect("/")
        })
        .catch((err) => {
            res.status(500).send('Something went wrong. ' + err)
        });
});

router.delete('/delete', (req, res) => {
    const requestData = req.body;
    const { filename } = requestData;

    s3Delete(filename)
        .then(() => {
            console.log("success delete");
            res.json({success: true})
        })
        .catch((err) => {
            res.status(500).send('Something went wrong. ' + err)
        });
})

module.exports = router;
