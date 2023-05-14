import express from 'express';
import axios from 'axios'
var app = express();

const port = process.env.PORT || 3001;
let imgs = [];
let catvids = []
function GetUrl() {
  console.log('atualizando URLS da imagens')
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
      imgs.push({ url: rep.data.media_url, type: rep.data.media_type })
    })
  }
}

//frete
app.get('/frete', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  console.log('Get parameter received are: ', req.query.frete, req.query.giga)
  let alt = 2
  let lar = 16
  let com = 24
  let w = 0.2
  console.log(req.query.giga == 'true')
  console.log(req.query.giga == true)
  if (req.query.giga == 'true') {
    alt = 6
    lar = 20
    com = 30
    w = 1.2
  }
  const options = {
    method: 'GET',
    url: 'https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + process.env.FRETE,
      'User-Agent': 'uauresinas (elexdragom@gmail.com)'
    },
    data: {
      from: { postal_code: '65065689' },
      to: { postal_code: req.query.frete },
      products: [{ id: 'resina', width: lar, heitgh: alt, lenght: com, weight: w, quantity: 1 }]
    }
  };
  axios.request(options).then(function (response) {
    res.json(response.data)
  })
}) 

//catvids 
function GetVideo() {  
  console.log('atualizando URLs dos vídeos')
  catvids = []
  let x = 0
  let count = -1
  let LID = '121998'
  let PZ = 'vz-c17c8b3f-285'
  let Key = process.env.CATKEY
  const options = {
    method: 'GET',
    url: 'https://video.bunnycdn.com/library/' + LID + '/videos?page=1&itemsPerPage=100&orderBy=date',
    headers: {
      accept: 'application/json',
      AccessKey: Key
    }};

  axios.request(options)
    .then((response) => {
      for (x; x < Number(response.data.items.length); x++) {
        count++ , catvids.push({ num: response.data.totalItems, url: `https://${PZ}.b-cdn.net/${response.data.items[count].guid}/play_480p.mp4` })
      }}
    )
}

//callfunctions
setInterval(GetUrl, 1.1 * 3600 * 1000)
setInterval(GetVideo,  30 * 1000)

//endpoints
app.get('/instaURLS', function (req, res) {
  console.log('i receive a GET request');
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.json(imgs)
})
app.get('/cats', function (req, res) {
  console.log('i receive a GET request');
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.json(catvids)
})
app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
