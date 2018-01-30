const search = instantsearch({
  appId: 'ITI5JHZJM9',
  apiKey: 'b427318cf6d881e5d3ffd84adf39219e',
  indexName: 'diybiosphere',
  urlSync: true,
  searchParameters: {
    facetingAfterDistinct: true
  }
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    reset: false,
    poweredBy: false,
    magnifier: false,
    placeholder: 'Search for (almost) anything in the entries, like `protocol`',
    cssClasses: {
      root: 'ui input'
    }
  })
);


search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats-container',
    cssClasses: {
      body: 'ui medium header',
    },
    templates: {
      body: 'Browse {{nbHits}} entries found'
    }
  })
);

search.addWidget(
  instantsearch.widgets.clearAll({
		container: '#clear-all',
		autoHideContainer: true,
		templates: {
			link: '<button class="ui red mini inverted button"><i class="fas fa-eraser icon"></i>Erase all</button>'
		},
  })
);

search.addWidget(
  instantsearch.widgets.currentRefinedValues({
    container: '#current-refined-values',
		autoHideContainer: true,
    clearAll: false,
		cssClasses: {
      root: 'ui horizontal list',
			header: 'item ui small header',
      body: 'item',
      list: 'ui horizontal list',
      item: 'item',
    },
		templates: {
			item: '<a class="ui label">{{name}} <i class="delete icon"></i></a>',
    },
  })
);



const EMPTY_TEMPLATE =
  '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

const HIT_TEMPLATE = `
<div class="ui basic segment xo padding bottom">
  <div class="ui relaxed items">
  	<div class="item">
  	  {{ #logo }}
  		<div class="ui tiny image">
  	    <img class="ui middle aligned" src="{{ uberimage }}">
  	  </div>
  		{{ /logo }}
  	  <div class="content">
  		<span class="meta right floated">{{#start-date}} {{start-date}} {{/start-date}}{{#end-date}} - {{end-date}} {{/end-date}} </span>
  	    <a href="{{url}}" class="header">{{{ _highlightResult.title.value }}}</a>
  	    <div class="meta">
  	      <span><em> {{#collection}} {{collection}} {{/collection}} {{#city}} in {{city}}, {{/city}} {{^city}} in {{/city}} {{#country}} {{country}} {{/country}}</em></span>
  	    </div>
  	    <div class="description">
  	      <p>{{{ _highlightResult.content.value }}}</p>
  	    </div>
  	    <div class="extra">
          <div class="ui horizontal small link list">
            <div class="item"><i class="far fa-tags"></i></div>
            {{#tags}}
    			 <a class="item" href="/entries/?q=&idx=diybiosphere&p=0&dFR%5Btags%5D%5B0%5D={{ . }}">{{ . }} </a>
           {{/tags}}
          </div>

  			</div>
  	  </div>
  	</div>
  </div>
</div>
`;

const TABLE_TEMPLATE = `
<table class="ui sortable celled table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Collection</th>
      <th>City</th>
      <th>Country</th>
      <th>Last Edit</th>
    </tr>
  </thead>
  <tbody>
  {{#hits}}
    <tr>
      <td><a href="{{url}}">{{{ _highlightResult.title.value }}}</a></td>
      <td>{{#collection}} {{collection}} {{/collection}}</td>
      <td>{{#city}} {{city}} {{/city}}</td>
      <td>{{#country}} {{country}} {{/country}}</td>
      <td>{{#last_modified_at}} {{last_modified_at}} {{/last_modified_at}}</td>
    </tr>
  {{/hits}}
  </tbody>
</table>
`;

const gridHits = instantsearch.widgets.hits({
    container: '#hits-container',
    templates: {
      empty: EMPTY_TEMPLATE,
      item: HIT_TEMPLATE
    },
  });

const tableHits = instantsearch.widgets.hits({
		container: '#table-container',
		templates: {
			empty: EMPTY_TEMPLATE,
			allItems: TABLE_TEMPLATE
		},
	});

search.addWidget(
  instantsearch.widgets.refinementList({
      container: '#collection',
      attributeName: 'collection',
      operator: 'or',
      limit: 10,
      cssClasses: {
  			list: 'ui small horizontal link list xo paddingless',
  			item: 'item',
  			active: 'active item',
      },
      templates: {
        item: '<a class="item">[{{value}} {{count}}]</a>',
      }
    })
  );

search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#type-org',
      attributeName: 'type-org',
      operator: 'or',
      limit: 10,
      cssClasses: {
  			list: 'ui small horizontal link list',
  			item: 'item',
  			active: 'active item',
      },
      templates: {
        item: '<a class="item">[{{value}} {{count}}]</a>',
      }
    })
  );


search.addWidget(
  instantsearch.widgets.refinementList({
      container: '#tags',
      attributeName: 'tags',
  		operator: 'or',
  		limit: 10,
      showMore: true,
  		cssClasses: {
  			list: 'ui small horizontal link list',
  			item: 'item',
  			active: 'active item',
      },
      templates: {
        item: '<a class="item">[{{value}} {{count}}]</a>',
      }
    })
  );


search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination-container',
    maxPages: 100,
    padding: 1,
    scrollTo: false,
    showFirstLast: true,
		autoHideContainer: true,
    cssClasses: {
			root: 'ui small compact menu',
      item: 'item',
      disabled: 'disabled item',
      active: 'active item',
		}
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#bottom-pagination-container',
    maxPages: 100,
    padding: 1,
    scrollTo: false,
    showFirstLast: true,
		autoHideContainer: true,
    cssClasses: {
			root: 'ui small compact menu',
      item: 'item',
      disabled: 'disabled item',
      active: 'active item',
		}
  })
);






search.addWidget(gridHits);
search.addWidget(tableHits);
search.start();
