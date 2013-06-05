var wr = require('./woorireport.js');

var fs = require('fs');
var file = "./example.html";
fs.readFile(file, 'utf8', function (err, data){
        if(err){
                console.log(err);
        }
        //console.log(data);
        //var p = new htmlparser.Parser(handler);
        //p.parseComplete(data);
        //inspect(handler.dom);
        wr.woorireport(data);
        console.log(wr.res);
        //sys.puts(sys.inspect(handler.dom, false,null));
});
