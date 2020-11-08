let location = '/public';
let express = require('express');
let app = express();
let serv = require('http').createServer(app);
app.get('/', (req, res) => {
	res.sendFile(__dirname + location + '/index.html');
});
app.use(location, express.static(__dirname + location));
let port = process.env.PORT || 8080;
serv.listen(port);

console.log(`Server running at http://localhost:8080`)
