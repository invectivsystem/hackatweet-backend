var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Tweet = require('../models/tweets');



router.get('/', (req, res) => {
	Tweet.find().then(data => {
		res.json({ tweet: data });
	});
});


module.exports = router;
