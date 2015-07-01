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

var _viewsBusinessView = require('./views/business-view');

var _viewsBusinessView2 = _interopRequireDefault(_viewsBusinessView);

var _viewsCreateView = require('./views/create-view');

var _viewsCreateView2 = _interopRequireDefault(_viewsCreateView);

var _viewsEditView = require('./views/edit-view');

var _viewsEditView2 = _interopRequireDefault(_viewsEditView);

var _viewsCompanyLotView = require('./views/company-lot-view');

var _viewsCompanyLotView2 = _interopRequireDefault(_viewsCompanyLotView);

var _viewsConfirmation = require('./views/confirmation');

var _viewsConfirmation2 = _interopRequireDefault(_viewsConfirmation);

var _viewsAttendantView = require('./views/attendantView');

var _viewsAttendantView2 = _interopRequireDefault(_viewsAttendantView);

var _modelsAttendantModel = require('./models/attendantModel');

var _viewsAttendantReservationView = require('./views/AttendantReservationView');

var _viewsAttendantReservationView2 = _interopRequireDefault(_viewsAttendantReservationView);

var _modelsBusinessModel = require('./models/business-model');

var _viewsUser = require('./views/user');

var _viewsUser2 = _interopRequireDefault(_viewsUser);

var _modelsLots = require('./models/lots');

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'parking': 'parking',
    'attendant': 'attendant',
    'business': 'business',
    'business/company/:company_id/lots': 'displayCompanyLots',
    'business/create': 'createForm',
    'business/:id/edit': 'editForm',
    'confirmation': 'confirmation',
    'attendant/reservations': 'checkReservations'

  },

  initialize: function initialize() {
    this.reservations = new _modelsAttendantModel.ReservationCollection();

    this.lots = new _modelsLots.LotsCollection();
    this.lots.fetch();
  },

  index: function index() {
    $('#app').html(JST.application);
  },

  business: function business() {
    var lots = new _modelsBusinessModel.LotCollection();
    lots.fetch();
    var view = new _viewsBusinessView2['default']({ collection: lots });
    $('#app').html(view.el);
  },

  displayCompanyLots: function displayCompanyLots(id) {
    var lots = new _modelsBusinessModel.LotCollection([{
      id: 1,
      company: 'Park Corp',
      company_id: 1,
      name: 'Hackathon',
      address: '101 North Main',
      availableSpaces: '12',
      hours: '8:00am to 6:00pm',
      price: '5.00'
    }, {
      id: 2,
      company: 'Park Corp',
      company_id: 1,
      name: 'Hackathon',
      address: '101 North Main',
      availableSpaces: '12',
      hours: '8:00am to 6:00pm',
      price: '5.00'
    }, {
      id: 3,
      company: 'Lot Corp',
      company_id: 2,
      name: 'Bay Lot',
      address: '101 South Main',
      availableSpaces: '24',
      hours: '8:00am to 6:00pm',
      price: '7.00'
    }]);
    var view = new _viewsBusinessView2['default']({ collection: lots });
    $('#app').html(view.el);
  },

  createForm: function createForm() {
    var lots = new _modelsBusinessModel.LotCollection();
    var view = new _viewsCreateView2['default']({ collection: lots });
    $('#app').html(view.el);
  },

  editForm: function editForm(id) {
    var lots = new _modelsBusinessModel.LotCollection();
    lots.fetch().then(function (list) {
      var view = new _viewsEditView2['default']({
        collection: list,
        model: id
      });
      $('#app').html(view.el);
    });
  },

  attendant: function attendant() {
    this.reservations.fetch().then((function () {

      $('#app').html(new _viewsAttendantView2['default']({ collection: this.reservations }).el);
    }).bind(this));
  },

  checkReservations: function checkReservations() {

    this.reservations.fetch().then((function () {

      $('#app').html(new _viewsAttendantReservationView2['default']({ collection: this.reservations }).el);
    }).bind(this));
  },

  parking: function parking() {
    this.lots = new _modelsLots.LotsCollection();
    this.lots.fetch().then((function (response) {
      this.UserView = new _viewsUser2['default']({ collection: this.lots });
      $('#app').html(this.UserView.el);
    }).bind(this));
  },

  confirmation: function confirmation() {
    this.reservations.fetch().then((function (response) {
      this.ConfirmationView = new _viewsConfirmation2['default']({ collection: this.reservations, data: this.lots });
      $('#app').html(this.ConfirmationView.el);
    }).bind(this));

    // console.log('hi');
  }

});

var router = new Router();
exports['default'] = router;
module.exports = exports['default'];
  
});

require.register("models/attendantModel", function(exports, require, module){
  /**
 * Created by firewaterjoe on 6/26/15.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var Reservation = Backbone.Model.extend({

  urlRoot: 'http://greenville-parking.com/reservations'

});

var ReservationCollection = Backbone.Collection.extend({
  model: Reservation,
  url: 'http://greenville-parking.com/reservations'
});
exports['default'] = { ReservationCollection: ReservationCollection, Reservation: Reservation };
module.exports = exports['default'];
  
});

require.register("models/business-model", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var Lot = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: 'http://greenville-parking.com/companies/lots',
  defaults: function defaults() {
    return {
      name: '',
      company: '',
      address: '',
      totalSpaces: '',
      hours: '',
      price: '',
      lattitude: '34.8628',
      longitude: '-82.3915',
      created_at: new Date()
    };
  }
});

var LotCollection = Backbone.Collection.extend({
  model: Lot,
  url: 'http://greenville-parking.com/companies/1/lots'
});

exports['default'] = { Lot: Lot, LotCollection: LotCollection };
module.exports = exports['default'];
  
});

require.register("models/lots", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var Lot = Backbone.Model.extend({

    urlRoot: 'http://greenville-parking.com/lots'

});

var LotsCollection = Backbone.Collection.extend({

    url: 'http://greenville-parking.com/lots',
    model: Lot

});

exports['default'] = { Lot: Lot, LotsCollection: LotsCollection };
module.exports = exports['default'];
  
});

require.register("views/AttendantReservationView", function(exports, require, module){
  /**
 * Created by firewaterjoe on 6/27/15.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ReservationSingleView = require('./ReservationSingleView');

var _ReservationSingleView2 = _interopRequireDefault(_ReservationSingleView);

exports['default'] = Backbone.View.extend({
    template: JST.attendantReservations,
    events: {},

    initialize: function initialize() {
        this.render();
    },
    render: function render() {
        this.$el.html(this.template());
        this.renderChildren();
    },
    renderChildren: function renderChildren() {
        _.invoke(this.children || [], 'remove');

        this.children = this.collection.map((function (child) {
            var view = new _ReservationSingleView2['default']({
                collection: this.collection,
                model: child
            });

            this.$('.attendant-reservation-list').append(view.el);
            return view;
        }).bind(this));

        return this;
    },

    remove: function remove() {
        _.invoke(this.children || [], 'remove');
        Backbone.View.prototype.remove.apply(this, arguments);
    },
    checkReservation: function checkReservation() {
        console.log(this);
    }
});
module.exports = exports['default'];

//'click .attendant-list-item': 'checkReservation'
  
});

require.register("views/ReservationSingleView", function(exports, require, module){
  /**
 * Created by firewaterjoe on 6/27/15.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = Backbone.View.extend({
    template: JST.attendantReservationSingle,
    tagName: 'li',
    className: 'attendant-list-item',
    events: {
        'click': 'dude'
    },

    initialize: function initialize() {

        this.render();
    },
    render: function render() {
        this.$el.html(this.template(this.model.toJSON()));
    },
    dude: function dude() {
        this.id = this.model.toJSON().id;
        console.log(this.id);
        console.log(this.collection);

        this.aModel = _.filter(this.collection.models, (function (param) {
            //console.log(param);
            if (param.id === this.id) {
                return param;
            };
        }).bind(this));

        //console.log(model);
        //this.collection.

        //console.log('collection',this.collection);
        //console.log('model', this.model);
        //var id = this.model.attributes.id;
        //this.collection.destroy(this.aModel.id);
    }

});
module.exports = exports['default'];
  
});

require.register("views/attendantView", function(exports, require, module){
  /**
 * Created by firewaterjoe on 6/26/15.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var AttendantView = Backbone.View.extend({
    template: JST.attendant,
    className: 'attendant-container',
    events: {
        'click .attendant-car-in': 'carIn',
        'click .attendant-car-out': 'carOut'
    },
    initialize: function initialize() {
        this.carMax = 55;

        this.cars = 30;
        this.reserved = this.collection.length;
        this.available = this.calculateAvailable();

        this.render();
    },

    render: function render() {
        this.$el.html(JST['attendant']({
            'cars': this.available,
            'reserved': this.reserved
        }));
    },
    carIn: function carIn() {
        this.available = $('.attendant-spots-left').text();
        this.cars -= 1;
        this.available = this.calculateAvailable();
        if (this.available >= 0) {
            this.render();
        } else {
            this.cars += 1;
            this.available = this.calculateAvailable();
        }
    },
    carOut: function carOut() {
        this.available = $('.attendant-spots-left').text();
        this.cars += 1;
        this.available = this.calculateAvailable();
        if (this.available <= this.carMax) {
            this.render(this.available);
        } else {
            this.cars -= 1;
            this.available = this.calculateAvailable();
        }
    },
    calculateAvailable: function calculateAvailable() {
        return this.cars - this.reserved;
    }
});
exports['default'] = AttendantView;
module.exports = exports['default'];
  
});

require.register("views/business-view", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _companyLotView = require('./company-lot-view');

var _companyLotView2 = _interopRequireDefault(_companyLotView);

var _router = require('./../router');

var _router2 = _interopRequireDefault(_router);

exports['default'] = Backbone.View.extend({
  template: JST.business,

  events: {
    'submit .business-search': 'searchCompany'
  },

  initialize: function initialize() {
    console.log(this.collection);
    this.render();
  },

  render: function render() {
    this.$el.html(this.template());
  },

  searchCompany: function searchCompany(e) {
    e.preventDefault();
    var companyName = this.$('.company-name-input').val();
    var companyLots = this.collection.where({ company: companyName });
    var companyLotsView = new _companyLotView2['default']({ collection: companyLots });
    $('.company-results').html(companyLotsView.el);
  }
});
module.exports = exports['default'];
  
});

require.register("views/company-lot-view", function(exports, require, module){
  "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Backbone.View.extend({
  template: JST.companylots,

  initialize: function initialize() {
    this.render();
  },

  render: function render() {
    this.$el.html(this.template(this.collection));
  }
});
module.exports = exports["default"];
  
});

require.register("views/confirmation", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Backbone.View.extend({

	template: JST['confirmation'],
	tagName: 'div',
	className: 'confirmation-container',

	events: {
		'click ': 'reserveSpace'
	},

	initialize: function initialize(options) {
		this.render();
		this.data = options.data;
		console.log(this);
		// this.listenTo(this.collection, 'add', this.confirm);
	},

	render: function render() {
		this.$el.html(this.template(this.collection.toJSON()));
	},

	reserveSpace: function reserveSpace() {
		var id = localStorage.getItem('id');
		_.filter(this.data.models, function (item) {
			if (item.attributes.id == id) {
				var remaining = item.attributes.availableSpaces;
				remaining--;
				item.set('availableSpaces', remaining);
				item.save();
				console.log(item);
			}
		});
		this.collection.create({}, {
			error: function error(model, response) {},
			success: function success(model, response) {
				$('.blur').html(response.reservation_key);
			}
		});
	}

});
module.exports = exports['default'];
  
});

require.register("views/create-view", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('./../router');

var _router2 = _interopRequireDefault(_router);

exports['default'] = Backbone.View.extend({
  template: JST.businesscreate,

  events: {
    'submit .business-create-form': 'saveModel'
  },

  initialize: function initialize() {
    console.log(this.collection);
    this.render();
  },

  render: function render() {
    this.$el.html(this.template());
  },

  saveModel: function saveModel(e) {
    e.preventDefault();
    var lotName = this.$('.business-name-create').val();
    var lotAddress = this.$('.business-address-create').val();
    var lotSpaces = this.$('.business-available-spaces-create').val();
    var lotHours = this.$('.business-hours-create').val();
    var lotPrice = this.$('.business-price-create').val();
    this.collection.create({
      name: lotName,
      address: lotAddress,
      totalSpaces: lotSpaces,
      hours: lotHours,
      price: lotPrice
    });
    console.log(this.collection);
    _router2['default'].navigate('business', { trigger: true });
  }
});
module.exports = exports['default'];
  
});

require.register("views/edit-view", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('./../router');

var _router2 = _interopRequireDefault(_router);

exports['default'] = Backbone.View.extend({
  template: JST.editform,

  events: {
    'submit .company-lot-edit-form': 'saveEdit',
    'click .company-lot-edit-delete': 'deleteLot'
  },

  initialize: function initialize() {
    console.log(this.collection);
    var modelId = this.model;
    var collection = this.collection;
    var list = _.filter(collection, function (object) {
      if (object._id === modelId) {
        return object;
      }
    });
    this.model = list;
    // var modelId = Number(this.model) - 1;
    // this.model = this.collection.models[modelId];
    this.render();
  },

  render: function render() {
    this.$el.html(this.template(this.model));
  },

  saveEdit: function saveEdit(e) {
    e.preventDefault();
    var lotName = this.$('.lot-name-edit').val();
    var lotAddress = this.$('.lot-address-edit').val();
    var lotSpaces = this.$('.lot-spaces-edit').val();
    var lotHours = this.$('.lot-hours-edit').val();
    var lotPrice = this.$('.lot-price-edit').val();
    this.collection.create({
      name: lotName,
      address: lotAddress,
      availableSpaces: lotSpaces,
      hours: lotHours,
      price: lotPrice
    });
    console.log(this.model);
    _router2['default'].navigate('business', { trigger: true });
  },

  deleteLot: function deleteLot(e) {
    e.preventDefault();
    var answer = confirm('Are you sure you want to delete this lot? This is irreversible');
    if (answer) {
      this.collection.destroy(this.model);
      _router2['default'].navigate('business', { trigger: true });
    }
  }
});
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
		'click .lot-reservation-form-submit': 'setId',
		'click .fa-close': 'hideForm'
	},

	initialize: function initialize() {
		var self = this;
		var coords = [];
		var counter = 0;
		this.listenTo(this.collection, 'update add remove change', this.refresh);
		_.map(this.collection.models, function (lot) {
			var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + lot.get('address') + '&key=AIzaSyAxLmBk-m1DqRj2OhzXzsVr6ECwRZty0X4';
			$.ajax({
				url: url,
				type: 'GET'
			}).then(function (response) {
				self.render();
				var address = self.collection.models[counter].attributes.address;
				var price = self.collection.models[counter].attributes.price;
				var name = self.collection.models[counter].attributes.name;
				var id = self.collection.models[counter].attributes.id;
				var remaining = self.collection.models[counter].attributes.availableSpaces;
				var totalSpaces = self.collection.models[counter].attributes.totalSpaces;
				counter++;
				var lat = response.results[0].geometry.location.lat;
				var lng = response.results[0].geometry.location.lng;
				coords.push({ 'lng': lng, 'lat': lat, 'address': address, 'price': price, 'name': name, 'id': id, 'remaining': remaining, 'totalSpaces': totalSpaces });
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
							$('.lot-specifics').fadeToggle();
							$('.lot-title').html(item.name);
							$('.lot-address').html(item.address);
							$('.lot-price').html('$ ' + item.price);
							$('.lot-specifics').attr('id', item.id);
							console.log(item.id);
						}
					});
				});
			});
		});
	},

	render: function render() {
		this.$el.html(this.template(this.collection.toJSON()));
	},

	hideForm: function hideForm() {
		$('.lot-specifics').fadeToggle();
	},

	refresh: function refresh() {
		this.collection.fetch().then((function () {
			this.initialize();
		}).bind(this));
	},

	setId: function setId() {
		var id = $('.lot-specifics').attr('id');
		localStorage.setItem('id', id);
	}

});
module.exports = exports['default'];
  
});

//# sourceMappingURL=app.js.map