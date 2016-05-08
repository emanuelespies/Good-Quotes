/* jshint undef: true, unused: true */
/* globals $ */
var esGoodQuotes = {

	loading: function() {"use strict";
		$('.loading').remove();
	},
	
	callQuotes: function() { "use strict";					  
		var url = "https://www.goodreads.com/quotes/list_rss/32122757-emanuele";
		$.ajax({
				url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
				dataType   : 'json',
				success: function (data) {
					var quotesLength 	= data.responseData.feed.entries.length,
						randomNr		=  Math.floor(Math.random() * (quotesLength - 0)) + 0,
						content			= data.responseData.feed.entries[randomNr].content;

						var appendContent = content.split('--');

						// just to check if it is really working
						window.console.log(randomNr);

					// remove loading element
					esGoodQuotes.loading();

					$('.loaded-quotes').append("<li class='list-group-item'><em>" + appendContent[0] + "</em><small class='text-right'>" + appendContent[1] + "</small>" + "</li>");
					$('.loaded-quotes').show();
				},
				error: function(error){
					window.console.log("Cannot get data " + error);
					$('.container').addClass('alert alert-danger').html("Sorry, we have a problem. Maybe you will have lucky in the next time.");
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