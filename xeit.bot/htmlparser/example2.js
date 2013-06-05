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
        //console.log(wr.res);
        //sys.puts(sys.inspect(handler.dom, false,null));
	
	var cmd = "50000원이상 쓴적은?";
	var retstr = ars(cmd,wr.res);
	console.log(retstr);
	
	var cmd2 = "1월 24일 에는?";
	var retstr2 = ars(cmd2,wr.res);
	console.log(retstr2);
	
});

var ars = function(cmd,data){
	console.log("query : " + cmd);
	//날짜 응답
	var qdate = '';
	//console.log(cmd);
	var numarray = cmd.match(/(\d{1,2})월\s*(\d{1,2})일/);
	var money = cmd.match(/(\d+)원/);
	//console.log(numarray);
	if(numarray != null){
		if(numarray[1].length == 1){
			qdate  = '0' + numarray[1];
		}
		else{
			qdate = numarray[1];
		}
		if(numarray[2].length == 1){
			qdate += '0' + numarray[2];
		}
		else{
			qdate += numarray[2];
		}
	
		//console.log(qdate);
		var ret = "";
		var sres = searchFrom(data,qdate,0);
		sres.forEach(function(item){
			ret += item[1] + " 에서 " + item[2] + "원 \n"; 
		});
		ret += "쓰셨습니다.";
		return ret;
		//console.log(sres);
	}
	if(money != null){
		//console.log(money);
		if(cmd.match("이상")){
			var ret = "";
			data.forEach(function(item){
					item[2] = item[2].replace(',','');
					//console.log(parseInt(item[2],10));
					if(parseInt(item[2],10) >= money[1] && item[0] != '소계'&& item[0] != '합계'){
						ret += item[0].substring(0,2) + "월" + item[0].substring(2,4) +  "일에 " + item[1] + " 에서 " + item[2] + "원 \n";
					}
				});
			ret += "쓰셨습니다.";
			return ret;
		}
	}
}
var searchFrom = function(data,qdate,idx){
	var ret = [];
	data.forEach(function(item){
			if(item[idx] == qdate){
				ret.push(item);
			}
		});
	return ret;
}
