module.exports = function (req, res, next) {
  console.log(req.session);
  if (req.session && req.session) {
    return res.json({
      userId: req.session
    })
  }
  return res.status(401).send();
};