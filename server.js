var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname+'/views/index.html');
});

app.get("/whoami", function (req, res) {
  var ip = req.headers['x-forwarded-for'];
  ip = ip.split(',')[0];
  var lan = req.headers['accept-language'];
  lan = lan.split(',')[0];
  var device = req.headers['user-agent'];
  device = device.match(/\([^\(\)]*\)/)[0];
  device = device.replace(/[\(\)]/g,"");
  var obj={};
  obj['ipaddress'] =ip;
  obj['language'] = lan;
  obj['software'] = device;
  res.send(obj);
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
