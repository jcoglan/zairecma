var faye = require('./vendor/faye/build/faye-node'),
    http = require('http'),
    fs   = require('fs');

var server = http.createServer(function(req, res) {
  var path = (req.url === '/') ? '/index.html' : req.url;
  fs.readFile('.' + path, function(err, content) {
    var type;
    if (/html$/.test(path)) type = 'text/html';
    if (/css$/.test(path))  type = 'text/css';
    if (/js$/.test(path))   type = 'text/javascript';
    if (/jpg$/.test(path))  type = 'image/jpeg';
    if (/png$/.test(path))  type = 'image/png';
    
    res.writeHead(200, {'Content-Type': type});
    res.write(err ? '' : content);
    res.end();
  });
});

var bayeux = new faye.NodeAdapter({mount: '/bayeux', timeout: 30}),
    ids    = [];

bayeux.addExtension({
  incoming: function(message, callback) {
    if (message.channel !== '/meta/connect') return callback(message);
    var id = message.clientId;
    if (ids.indexOf(id) < 0) ids.push(id);
    console.log(ids.length);
    callback(message);
  }
});

bayeux.attach(server);
server.listen(3000);
