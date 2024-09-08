const express = require("express");
const urlRoute = require("./routes/url.route.js");
const Url = require("./models/url.model.js");
const { connectDb } = require("./connect.js");
const app = express();
const PORT = 8000;
connectDb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("mongoDb connected")
);
app.use(express.json());
app.use("/url", urlRoute);
app.get("/:shortUrl", async (req, res) => {
  const shortId = req.params.shortUrl;
  const entry = await Url.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});
app.listen(PORT, () => {
  console.log("server started");
});
