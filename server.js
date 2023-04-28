var express = require('express');
var app = express();
const port = process.env.PORT || 3001;
app.get('/fimlList', function(req, res) {
  console.log('i receive a GET request');

  var tryFetch = {myString: 'É tetraaaaaa !!!!!!!!!!!'};
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(tryFetch)
})

app.listen(port);
console.log('Server running on port '+port);
