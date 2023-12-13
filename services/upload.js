const {
    PutObjectCommand,
} = require("@aws-sdk/client-s3");

const {s3Client} = require('./s3');

module.exports = s3Upload =  async (file) => {
    let {originalname} = file;
    originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')

    const buf = file.buffer;

    const currentTime = new Date().getTime();

    const data = {
        Bucket: `${process.env.S3_BUCKET}`,
        Key: `${currentTime}_${originalname}`,
        Body: buf,
        ACL: "public-read-write"
    };
    const result = await s3Client.send(new PutObjectCommand(data));

    try {
        return result;
    } catch(error) {
        throw new Error(error);
    }
};