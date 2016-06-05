var fs = require('fs');
var jsdom = require("jsdom");

// get the content sorted by date
// get all the strings
// clean it
// and then send to read the file
// if it is a new quote
// add it
jsdom.env({
	url: "https://www.goodreads.com/quotes/list/32122757-emanuele?sort=date_added",
	scripts: ["http://code.jquery.com/jquery.js"],
	done: function (errors, window) {
		var $ = window.$;

		$("#sortable_items li").each(function() {

			var	quoteID = $(this).find(".quoteFooter a.smallText").attr('href'),
				author = $(this).find(".authorOrTitle").first().text(),
				book = $(this).find(".authorOrTitle").eq(1).text(),
				link = "http://goodreads.com" + quoteID,
				description = $(this).find('.quoteText').first().html().split('<br>  ―');

				// spliting everything so we have the value we need
				var quoteIDp1 = quoteID.split('/');
				var quoteIDp2 = quoteIDp1[2].split('-');
				quoteID = quoteIDp2[0];


				// fixing the problems with the string 
				// that Good Reads provide us
				function replace(content) {
					content = content.replace(/[`@#$%&*()_|+\-=?;:"“”\{\}\[\]\\\/]/gi, '');
					content = content.replace(/[']/g, "’");
					content = content.replace(/["]/g, '\"');
					content = $.trim(content);

					return content;
				}

				// spliting description
				description = description[0];
				// fixing caracteres
				description = replace(description);
				book 		= replace(book);

			// update file with this new quote
			updateFile(quoteID, author, book, link, description);
		});

		console.log('Done with Uploading json File');
	}
});

var updateFile = function(quoteID, author, book, link, description) {

	var json;
	var data 	= fs.readFileSync(__dirname + "/json.js", "utf8"),
		refresh = false,
		content = null;
	
	json = JSON.parse(data);


	for ( var i = 0; i < json.quote.length; i++ ) {
		var jsonQuoteID = json.quote[i].quoteID;
		
		if ( quoteID == jsonQuoteID ) {
			refresh = false;
			break;
		}
		refresh = true;
	}

	// ok, refresh is true, 
	// so now is time to magic
	if ( refresh ) { 
		// the new content
		content = {
			quoteID: quoteID, 
			author: author, 
			book: book, 
			link: link, 
			description: description
		};

		// add the new content to json 
		json.quote.push(content);
	
		// write the new file
		fs.writeFileSync(__dirname + "/json.js", JSON.stringify(json, null, "\t"));
	}


};