
import express from 'express';
import axios from 'axios'
var app = express();

const port = process.env.PORT || 3001;
let imgs = [];
function GetUrl() {
	imgs = [];
	const token = process.env.TOKEN
	const url = "https://graph.instagram.com/6053160891434854/media?fields=id&access_token=" + token;
	let x = 0;
	let count = -1;
	for (x; x < 4; x++) {
		axios.get(url).then(function (rep) {
			count++
			return axios.get('https://graph.instagram.com/' + rep.data.data[count].id + '?fields=media_type,media_url&access_token=' + token)
		}
		).then((rep) => {
			imgs.push(rep.data.media_url)
		})
	}
	setTimeout(() => {
		console.log('urls atualizadas')
		app.get('/instaURLS', function (req, res) {
			console.log(imgs)
			console.log('i receive a GET request');
			res.setHeader("Access-Control-Allow-Origin", "*")
			res.json(imgs)
		})
	}, 5000)
}
setInterval(GetUrl, 60000)

app.listen(port, () => {
	console.log(`listening on port ${port}`);
})
