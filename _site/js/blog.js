document.addEventListener('DOMContentLoaded', function() {
  const searchClient = algoliasearch('JL7BROHM5Z', 'd36c790225de9ec79cefd7c0e728619e');
    
  const search = instantsearch({
    indexName: 'blog',
    searchClient,
    searchFunction: function(helper) {
      const searchResults = $('#search_results');
      const hits = $('#hits');
      if (helper.state.query === '') {
        // empty query string -> hide the search results & abort the search
        hits.hide();
        searchResults.hide();
        return;
      }
      // perform the regular search & display the search results
      helper.search();
      searchResults.show();
      hits.show();
    }
  });

  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: '#searchbox',
    }),

    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        item: `
          <p>
            <a href="{{url}}">{{ title }}</a>
          </p>
          
        `,
      }
    })
  ]);

  search.start();
});


(function($) {
  "use strict"; // Start of use strict
  // Floating label headings for the contact form
  $("body").on("input propertychange", ".floating-label-form-group", function(e) {
    $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
  }).on("focus", ".floating-label-form-group", function() {
    $(this).addClass("floating-label-form-group-with-focus");
  }).on("blur", ".floating-label-form-group", function() {
    $(this).removeClass("floating-label-form-group-with-focus");
  });

  // Show the navbar when the page is scrolled up
  var MQL = 992;

  //primary navigation slide-in effect
  if ($(window).width() > MQL) {
    var headerHeight = $('#mainNav').height();
    $(window).on('scroll', {
        previousTop: 0
      },
      function() {
        var currentTop = $(window).scrollTop();
        //check if user is scrolling up
        if (currentTop < this.previousTop) {
          //if scrolling up...
          if (currentTop > 0 && $('#mainNav').hasClass('is-fixed')) {
            $('#mainNav').addClass('is-visible');
          } else {
            $('#mainNav').removeClass('is-visible is-fixed');
          }
        } else if (currentTop > this.previousTop) {
          //if scrolling down...
          $('#mainNav').removeClass('is-visible');
          if (currentTop > headerHeight && !$('#mainNav').hasClass('is-fixed')) $('#mainNav').addClass('is-fixed');
        }
        this.previousTop = currentTop;
      });
  }

})(jQuery); // End of use strict
