const {
    DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const {s3Client} = require('./client');

module.exports = s3Delete =  async (filename) => {
    const data = {
        Bucket: `${process.env.S3_BUCKET}`,
        Key: filename,
    };
    const result = await s3Client.send(new DeleteObjectCommand(data));

    try {
        return result;
    } catch(error) {
        throw new Error(error);
    }
};
