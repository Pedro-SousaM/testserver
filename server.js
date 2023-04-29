import express from 'express';
import axios from 'axios'
var app = express();

const port = process.env.PORT || 3001;
let imgs = []; 
let count = 0
function GetUrl() { 
	count++ 
	imgs.push(count)
}
	setInterval(GetUrl, 15000)
	app.get('/instaURLS', function (req, res) {
		console.log('i receive a GET request');
		res.setHeader("Access-Control-Allow-Origin", "*")
		res.json(imgs)
	})

app.listen(port, () => {
	console.log(`listening on port ${port}`);
})
