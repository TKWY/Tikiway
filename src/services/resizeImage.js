const sharp = require('sharp');

const resizeImage = async(req, res) => {
  await sharp(file.buffer)
    .resize(200, 200)
    .toFormat("jpeg")
    .jpeg({quality: 90})
    .toFile(req.filename)
};

module.exports = resizeImage;
