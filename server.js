import express from 'express';
import axios from 'axios'
var app = express();

const port = process.env.PORT || 3001;
let imgs = [];
function GetUrl() {
	console.log('atualizando URLS')
	imgs = [];
	const token = process.env.TOKEN 
	const token1 = process.env.TOKEN1
	const url = "https://graph.instagram.com/6053160891434854/media?fields=id&access_token=" + token; 
	const url1 = "https://graph.instagram.com/6245241412178691/media?fields=id&access_token=" + token1; 
	let x = 0;
	let count = -1; 
	axios.get(url1)
	for (x; x < 20; x++) {
		axios.get(url).then(function (rep) {
			count++
			return axios.get('https://graph.instagram.com/' + rep.data.data[count].id + '?fields=media_type,media_url&access_token=' + token)
		}
		).then((rep) => {
			imgs.push({url:rep.data.media_url, type:rep.data.media_type})
		})
	} 
}
	GetUrl() 
	
	app.get('/instaURLS', function (req, res) {
		console.log('i receive a GET request');
		res.setHeader("Access-Control-Allow-Origin", "*")
		res.json(imgs)
	})

app.listen(port, () => {
	console.log(`listening on port ${port}`);
})
