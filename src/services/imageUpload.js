const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const {AWSAccess, AWSSecret, bucketName} = require('../../config');

const s3 = new AWS.S3({
  accessKeyId: AWSAccess,
  secretAccessKey: AWSSecret
});

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: bucketName,
    metadata: (req, file, cb) => {
      cb(null, {fieldName: "TESTING_METADATA"});
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString()+'-'+ file.originalname)
    },
    resize: {
      width: 200,
      height: 200
    }
  })
});

module.exports = uploadS3;
