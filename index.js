const express = require("express");
const urlRoute = require("./routes/url.route.js");
const staticRoute = require("./routes/static.route.js");
const Url = require("./models/url.model.js");
const { connectDb } = require("./connect.js");
const path = require("path");
const app = express();
const PORT = 8000;

connectDb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("mongoDb connected")
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", urlRoute);
app.use("/", staticRoute);
app.get("/url/:shortUrl", async (req, res) => {
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
