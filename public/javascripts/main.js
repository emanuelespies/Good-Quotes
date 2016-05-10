/* jshint undef: true, unused: true */
/* globals $ */
var esGoodQuotes = {

	loading: function() {"use strict";
		$('.loading').remove();
	},
	
	callQuotes: function() { "use strict";					  
		var url = "https://www.goodreads.com/quotes/list_rss/32122757-emanuele";
		$.ajax({
				url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&callback=?&q=' + encodeURIComponent(url),
				dataType   : 'json',
				success: function (data) {
					var quotesLength 	= data.responseData.feed.entries.length,
						randomNr		=  Math.floor(Math.random() * (quotesLength - 0)) + 0,
						content			= data.responseData.feed.entries[randomNr].content,
						link			= data.responseData.feed.entries[randomNr].link;

						var appendContent = content.split('--');

					// remove loading element
					esGoodQuotes.loading();

					$('.loaded-quotes').append("<p class='list-group-item'><em>" + appendContent[0] + "</em><small class='text-right'><a target='_blank' alt='Click to see on Good Reads Page' href='" + link + "'>" + appendContent[1] + "</a></small>" + "</p>");
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