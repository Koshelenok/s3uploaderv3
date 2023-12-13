const {
    S3Client, 
} = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT
});

module.exports = { s3Client };