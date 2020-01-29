function validatePostBody(req, res, next) {
  const contentToPost = req.body;

  if (Object.keys(contentToPost).length === 0) {
    res.status().json({ message: 'Invalid Credentials!' });
  } else if (!contentToPost.username || !contentToPost.password) {
    res.status().json({
      message: 'Please provide username or password'
    })
  } else {
    next();
  }
}

module.exports = validatePostBody;