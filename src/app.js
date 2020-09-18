function main() {
    var http = require('http');
    var url = require('url');
    var fs = require('fs');

    let args = process.argv.slice(2,process.argv.length)

    if (args.includes("port")) {
        let PORT = args.indexOf("port")+1;
        PORT = args[
            PORT
        ];
        if (!PORT) {
            console.log("Please Give a port")
            return 1;
        }
        
        
        http.createServer(function (req, res) {
            var q = url.parse(req.url, true);
            var filename = "." + q.pathname;
            fs.readFile(filename, function(err, data) {
              if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
              }
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              return res.end();
            });
          }).listen(PORT);
        console.log("Server running on Port: "+PORT);
    }
}

main()