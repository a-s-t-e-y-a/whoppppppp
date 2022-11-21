function postRoute(req, res) {
  const { title, image, text } = req.body;
  if (!title) {
    res.status(200).json({
      messgae: "Error enter all credentials properly",
    });
  } else if (image) {
  } else if (text) {
  } else {
    res.status(200).json({
      message: "No Data get to post",
    });
  }
}
module.exports = { postRoute };
