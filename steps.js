var http = require('http');
var port2 = (process.env.PORT || process.env.VCAP_APP_PORT || 8888);
var js2xmlparser = require("js2xmlparser");
var json2html = require('node-json2html');
var url=require('url');

var json;
var xmlData;
var html;

//require the csvtojson converter class 
var Converter = require("csvtojson").Converter;
// create a new converter object
var converter = new Converter({});


// call the fromFile function which takes in the path to your 
// csv file as well as a callback function
converter.fromFile("quotes.csv",function(err,result){
    // if an error has occured then handle it
    if(err){
        console.log("An Error Has Occured");
        console.log(err);  
    } 
    // create a variable called json and store
    // the result of the conversion
    json = result;
    
    // log our json to verify it has worked
    //console.log(json);
  
    xmlData = js2xmlparser.parse("Book", json);
    
    var headertemplate = {
    		"tag": "table",
            "id": "Book",
            "border": "1",
            "width":"100%",
            "children": [
              {
                "tag": "tr",
                "children": [
                  {
                    "tag": "th",
                    "width":"80%",
                    "html": "Title"
                  },
                  {
                    "tag": "th",
                    "width":"20%",
                    "html": "Author"
                  }
                  ]
              }
            ]
    };
            
    var template = {
            "tag": "table",
            "border": "1",
            "width":"100%",
            "children": [ 
                  {
                    "tag": "tr",
                    "children": [
                      {
                        "tag": "td",
                        "width":"80%",
                        "html": "${title}"
                      },
                      {
                        "tag": "td",
                        "width":"20%",
                        "html": "${author}"
                      }
                     
                ]
              } 
            ]
          }; 
    
    //var transform = {"<>":"div","html":"${title} likes ${author}"};
    html = json2html.transform(json[0],headertemplate);
    html = html + json2html.transform(json,template);

});



module.exports = {
		convertToJson: function (urlJson) {
			
			var server=http.createServer(function(req,res){
			    var pathname=url.parse(req.url).pathname;
			    switch(pathname){
			        case '/quote.json':
			        	res.setHeader('Content-Type', 'application/json');
				        res.end('value = ' + JSON.stringify(json));
			        break;
			        case '/quote.xml':
			        	res.setHeader('Content-Type', 'application/xml');
				        res.end(xmlData);
			        break;
			        case '/quote.html':
			        	res.setHeader('Content-Type', 'text/html');
						res.write(html);
						res.end();
			        break;
			        default:
			        	res.end("Home");
			        break;
			    }

			}).listen(port2);

			  //  var app = http.createServer(function(req,res){
			   //     res.setHeader('Content-Type', 'application/json');
			 //       res.end('value = ' + JSON.stringify(json));
			 //   }).listen(port2);
			    
			    
		
		  },
		  
		  
		  convertToXml: function (urlXml) {
			  
			  
			 /* var server=http.createServer(function(req,res){
				    var pathname=url.parse(req.url).pathname;
				    switch(pathname){
				        case urlXml:
				        	res.setHeader('Content-Type', 'application/xml');
					        res.end(xmlData);
				        break;
				    }

				}).listen(port2);
				*/

			   // var app = http.createServer(function(req,res){
			    //    res.setHeader('Content-Type', 'application/xml');
			    //    res.end(xmlData);
			    //}).listen(port2);
			  
		    
		  },
		  
		  convertToHtml: function (urlHtml) {
			  
			/*  var server=http.createServer(function(req,res){
				    var pathname=url.parse(req.url).pathname;
				    switch(pathname){
				        case urlHtml:
				        	res.setHeader('Content-Type', 'text/html');
							res.write(html);
							res.end();
				        break;
				    }

				}).listen(port2);
			  */
			  
			 // var app = http.createServer(function(req,res){
			   //     res.setHeader('Content-Type', 'text/html');
			   //     res.write(html);
			  //      res.end();
			   // }).listen(port2);
			  
		  }
};