var htmlparser = require("htmlparser");
var sys = require('sys');
//var fs = require('fs');
var handler = new htmlparser.DefaultHandler(function (error, dom) {
    if (error)
	console.log(error);
    //else
//	console.log(dom);
});
//var file = "./example.html";
var res = [];
var inspect = function(hd){
	hd.forEach(function(item){
       		if(item.raw == 'tr style="height:25px;"'){
			//console.log("find row");
       			//console.log(item);
			var index = 0;
			var resitem =[];
			var ti = 6;
               		item.children.forEach(function(ic){
				if(ic.children != null){
					ic.children.forEach(function(icc){
						//console.log("item");
						//console.log(icc);
						icc.raw = icc.raw.replace(/&nbsp;/g, "");
						if(icc.raw == 'ITUNES-USD' || icc.raw == 'I-TUNES-USD'){
							ti = 7
						}
						else if(icc.raw == '소계' || icc.raw == '합계'){
							ti = 3;
						}
						if(index == 0){
							resitem.push(icc.raw);
						}
						else if(index == 2){
							resitem.push(icc.raw);
						}
						else if(index == ti){
							if(icc.raw == '0'){
								ti = 7;
							}
							else{
								resitem.push(icc.raw);
							}
						}
					});
					index++;
					//res.push(resitem);
				}
			});
			res.push(resitem);
		}
               	else{
			if(item.children != null){
               			inspect(item.children);
			}
               	}
        });
}
/*
fs.readFile(file, 'utf8', function (err, data){
        if(err){
                console.log(err);
        }
        //console.log(data);
        //var p = new htmlparser.Parser(handler);
        //p.parseComplete(data);
	//inspect(handler.dom);
	woorireport(data);
	console.log(res);
	//sys.puts(sys.inspect(handler.dom, false,null));
});
*/
var woorireport = function(mail){
	var hp = new htmlparser.Parser(handler);
	hp.parseComplete(mail);
	inspect(handler.dom);
}

exports.woorireport = woorireport;
exports.res = res;
