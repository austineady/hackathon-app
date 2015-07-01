require.register("main", function(exports, require, module){
  'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

(function () {
  'use strict';

  $(document).ready(function () {
    Backbone.history.start();
  });
})();
  
});

require.register("router", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _viewsUser = require('./views/user');

var _viewsUser2 = _interopRequireDefault(_viewsUser);

var _modelsLots = require('./models/lots');

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'parking': 'parking',
    'attendant': 'attendant',
    'business': 'business'
  },

  parking: function parking() {
    this.lots = new Backbone.Collection([{ 'address': '101 North Main Street Greenville, SC',
      'price': 5 }, { 'address': '131 North Main Street Greenville, SC',
      'price': 4 }]);
    // this.lots.fetch().then(function(response) {
    this.UserView = new _viewsUser2['default']({ collection: this.lots });
    $('#app').html(this.UserView.el);
    // }.bind(this));
    // console.log('hi');
  }

});

var router = new Router();
exports['default'] = router;
module.exports = exports['default'];
  
});

require.register("models/lots", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var Lot = Backbone.Model.extend({

	defaults: {
		'address': '',
		'price': 0,
		'totalSpaces': 0
	}

});

var LotCollection = Backbone.Collection.extend({

	model: Lot

});

exports['default'] = { Lot: Lot, LotCollection: LotCollection };
module.exports = exports['default'];
  
});

require.register("views/user", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Backbone.View.extend({

	template: JST['user'],
	tagName: 'div',
	className: 'user-view',

	events: {
		'click .lot-reservation-action': 'reserveSpot'
	},

	initialize: function initialize() {
		var self = this;
		var coords = [];
		var counter = 0;
		_.map(this.collection.models, function (lot) {
			var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + lot.get('address') + '&key=AIzaSyAxLmBk-m1DqRj2OhzXzsVr6ECwRZty0X4';
			$.ajax({
				url: url,
				type: 'GET'
			}).then(function (response) {
				self.render();
				var address = self.collection.models[counter].attributes.address;
				var price = self.collection.models[counter].attributes.price;
				counter++;
				var lat = response.results[0].geometry.location.lat;
				var lng = response.results[0].geometry.location.lng;
				coords.push({ 'lng': lng, 'lat': lat, 'address': address, 'price': price });

				var map = new GMaps({
					div: '#map-canvas',
					lat: 34.852618,
					lng: -82.39401
				});
				_.map(coords, function (item) {
					map.addMarker({
						lat: item.lat,
						lng: item.lng,
						title: 'Parking-Lot',
						click: function click(e) {
							alert(item.lat);
							console.log(item);
						}
					});
				});
			});
		});
	},

	render: function render() {
		this.$el.html(this.template(this.collection.toJSON()));
	},

	reserveSpot: function reserveSpot() {
		console.log(this.collection);
	}

});
module.exports = exports['default'];
  
});

//# sourceMappingURL=app.js.map