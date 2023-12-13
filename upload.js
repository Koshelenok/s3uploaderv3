const {
    S3Client, 
    PutObjectCommand,
} = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT
});

module.exports = S3_upload =  async (file) => {
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
    try {
        const result = await s3Client.send(new PutObjectCommand(data));
        return result;
    } catch(error) {
        console.log("Error", err);
    }
};
