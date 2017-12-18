var fs = require('fs');
var http = require('http');

var file = fs.createWriteStream('demo.txt');
for (var i =0; i <= 1000; i++){
    file.write('<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi nulla quam accusantium quas impedit dolores. Quisquam sequi molestiae enim sapiente natus, nesciunt veritatis praesentium deleniti ipsa et molestias, debitis corrupti.</p>');
}
file.end();

var app = http.createServer(function(req, res) {
    if (req.url === '/stream') {
        var stream = fs.createReadStream('demo.txt');
        stream.pipe(res);
    } else if (req.url === '/file') {
        var read = fs.readFile('demo.txt', function(err, data) {
            res.write(data);
            res.end();
        });
    } else {
        res.write('<p>There is nothing special on this page</p>');
        res.end();
    }
});

app.listen(3000, function() {
    console.log('On localhost');
});