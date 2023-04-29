import express from 'express';
import axios from 'axios'
var app = express();

const port = process.env.PORT || 3001;
let imgs = [];

	app.get('/instaURLS', function (req, res) {
		console.log('i receive a GET request');
		res.setHeader("Access-Control-Allow-Origin", "*")
		res.json(imgs)
	})

app.listen(port, () => {
	console.log(`listening on port ${port}`);
})
