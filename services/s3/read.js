const {
    GetObjectCommand,
} = require("@aws-sdk/client-s3");

const {s3Client} = require('./client');


module.exports = s3Read =  async (filename) => {
    const data = {
        Bucket: `${process.env.S3_BUCKET}`,
        Key: filename,
    };
    const result = await s3Client.send(new GetObjectCommand(data));
    try {
        return result;
    } catch(error) {
        throw new Error(error);
    }
};
