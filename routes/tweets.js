var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
const Tweet = require("../models/tweets");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

router.post("/tweet", (req, res) => {
  //vérifier que les champs soient remplis
  if (!checkBody(req.body, ["content"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  // chercher un compte via son token
  User.findOne({ token: req.body.token }).then((data) => {
    if (data) {
      console.log("voici la data");
      const newTweet = new Tweet({
        author: data._id,
        content: req.body.content,
        date: new Date(),
        like: [],
      });

      newTweet.save().then((newTweet) => {
        res.json({ result: true, Tweet: newTweet });
      });
    } else {
      res.json({ result: false, error: "You need to be connected" });
    }
  });
});

router.get("/tweet/:token", (req, res) => {
  User.findOne({ token: req.params.token }).then((data) => {
    if (data) {
      Tweet.find()
        .populate("author")
        .then((data) => res.json({ result: true, tweet: data }));
    }
  });
});

router.delete("/:_id", (req, res, next) => {
  Tweet.deleteOne({
    _id: req.params._id,
  }).then((result) => {
    res.status(200).json({
      message: "Tweet deleted!",
      tweet: result,
    });
  });
});

module.exports = router;
