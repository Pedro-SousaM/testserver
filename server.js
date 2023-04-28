var express = require('express');
var app = express();  

const jsdom = require('jsdom')
const dom = new jsdom.JSDOM("")
const $ = require('jquery')(dom.window) 
const port = process.env.PORT || 3001;
var imgs = []
	$(function () {
		const token = process.env.TOKEN
		const url = "https://graph.instagram.com/6053160891434854/media?fields=id&access_token=" + token
		let x = 0 
		for (x; x < 20; x++) {  
		$.get(url).then(async function (rep) { 
		return await $.get('https://graph.instagram.com/' + rep.data[count].id + '?fields=media_type,media_url&access_token=' + token)
		}).then((rep) => { 
			imgs.push(rep.media_url)
			})}
		})  

setTimeout(()=>{app.get('/fimlList', function(req, res) {
  console.log('i receive a GET request');
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.json(imgs)
})},5000)

app.listen(port, () => {
  console.log(`listening on port ${port}`); 
})
