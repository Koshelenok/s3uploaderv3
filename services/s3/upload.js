const {
    PutObjectCommand,
} = require("@aws-sdk/client-s3");

const {s3Client} = require('./client');

module.exports = s3Upload =  async (file) => {
    let {originalname} = file;
    originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')

    const buf = file.buffer;

    const currentTime = new Date().getTime();

    const filename = `${currentTime}_${originalname}`;

    const data = {
        Bucket: `${process.env.S3_BUCKET}`,
        Key: filename,
        Body: buf,
        ACL: "public-read-write"
    };

    console.log("uploaded filename: " + filename);
    const result = await s3Client.send(new PutObjectCommand(data));

    try {
        return result;
    } catch(error) {
        throw new Error(error);
    }
};
