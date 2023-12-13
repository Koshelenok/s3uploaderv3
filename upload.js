const {
    S3Client, 
    PutObjectCommand,
} = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT
});

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
