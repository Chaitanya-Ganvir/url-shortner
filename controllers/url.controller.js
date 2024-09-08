const shortid = require("shortid");
const Url = require("../models/url.model.js");

async function generateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortId = shortid();
  const allUrls = await Url.find({});
  await Url.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.render("home", {
    urls: allUrls,
    id: shortId,
  });
}

module.exports = {
  generateShortUrl,
};
