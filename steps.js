var http = require('http');

module.exports = {
		convertToJson: function () {
			
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
			    var json = result;
			    
			    // log our json to verify it has worked
			    console.log(json);
			    

			});
			
			
			
			
		  },
		  
		  
		  convertToXml: function () {
			  
			  var CSV2XML = require('csv2xml');
			  var fs = require('fs');
			  
			// create new parser by passing an configuration to the parser

			  var i = 1;
			  var parser = new CSV2XML({
				  primaryKey: 'title',
				  sorted: true,
			  		mapping: {			  		
			  			'title': 'iati-activities/iati-activity/title/text()',
			  			'author': 'iati-activities/iati-activity/author/text()'
			  		}
			  	});

			  	// pipe a readable stream to the parser and then to a writable stream
			  	
			  	var inFile = fs.createReadStream('quotes.csv');
			  	var outFile = fs.createWriteStream('some-other-file.xml');
			  
			  	 //console.log(fs);
			  
			  	inFile.pipe(parser).pipe(outFile);
			  
		    
		  }
};