/* jshint undef: true, unused: true */
/* globals $ */
var esGoodQuotes = {

	loading: function() {"use strict";
		$('.loading').remove();
	},
	callQuotes: function() { "use strict";					  
		var url = "../lib/json.js";
		$.ajax({
				url: url,
				dataType   : 'json',
				success: function (data) {
					var quotesLength 	= data.quote.length,
						randomNr		=  Math.floor(Math.random() * (quotesLength - 0)) + 0,
						description		= data.quote[randomNr].description,
						link			= data.quote[randomNr].link,
						book 			= data.quote[randomNr].book,
						author 			= data.quote[randomNr].author;

					// remove loading element
					esGoodQuotes.loading();

					$('.loaded-quotes').append("<p class='list-group-item'><em>" + '"' + description + '"' + "</em><small class='text-right'><a target='_blank' alt='Click to see on Good Reads Page' href='" + link + "'>" + author + "<br />" + book + "</a></small>" + "</p>");
					$('.loaded-quotes').show();
				},
				error: function(error){
					window.console.log("Cannot get data " + error);
					$('.loaded-quotes').toggleClass('well alert alert-danger').html("Sorry, we had a problem. Maybe youá better ll have luck in the next time.");
				}
		});
	},

	init: function() {
		"use strict";
		
		// call Quotes Metric
		esGoodQuotes.callQuotes();
	}
};

// wait until we have jQuery 
function waitjQuery(method) {"use strict"; if (window.jQuery) esGoodQuotes.init(); else setTimeout(function() { waitjQuery(method); }, 50);}
// call waitjQuery
waitjQuery();