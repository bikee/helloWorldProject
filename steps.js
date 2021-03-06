var http = require('http');
var port2 = (process.env.PORT || process.env.VCAP_APP_PORT || 8080);
var js2xmlparser = require("js2xmlparser");
var json2html = require('node-json2html');
var url=require('url');

var json;
var jsonRandom;
var xmlData;
var html;
var fileName;
var headertemplate;
var template;




module.exports = {
		convertToJson: function (fileName) {
			
			//require the csvtojson converter class 
			var Converter = require("csvtojson").Converter;
			// create a new converter object
			var converter = new Converter({});


			// call the fromFile function which takes in the path to your 
			// csv file as well as a callback function
			converter.fromFile(fileName,function(err,result){
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
			  
			   
			    
			    headertemplate = {
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
			            
			    template = {
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
			    
			   

			});

			
			var server=http.createServer(function(req,res){
			    var pathname=url.parse(req.url).pathname;
			    switch(pathname){
			        case '/quote.json':
			        	res.setHeader('Content-Type', 'application/json');
			        	jsonRandom = json[Math.floor(Math.random() * json.length)];
				        res.end(JSON.stringify(jsonRandom));
			        break;
			        case '/quote.xml':
			        	res.setHeader('Content-Type', 'application/xml');
			        	jsonRandom = json[Math.floor(Math.random() * json.length)];
			        	xmlData = js2xmlparser.parse("Book", jsonRandom);
				        res.end(xmlData);
			        break;
			        case '/quote.html':
			        	 //var transform = {"<>":"div","html":"${title} likes ${author}"};
			        	jsonRandom = json[Math.floor(Math.random() * json.length)];
			        	html = json2html.transform(jsonRandom,headertemplate);
					    html = html + json2html.transform(jsonRandom,template);
					    
			        	res.setHeader('Content-Type', 'text/html');
						res.write(html);
						res.end();
			        break;
			        case '/':
			        	res.end("This is the home page ");
			        break;
			        default:
			        	res.end("Sorry!! This page doesn't exist");
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