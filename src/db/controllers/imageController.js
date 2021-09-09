imageUpload = async (req, res) => {
  try {
    return res.send(req.file.key)
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
};

module.exports = {
  imageUpload
}
