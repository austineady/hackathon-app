
import BusinessView from './views/business-view';
import CreateView from './views/create-view';
import EditView from './views/edit-view';
import CompanyLotsView from './views/company-lot-view';
import AttendantView from './views/AttendantView';
import AttendantReservationView from './views/AttendantReservationView'
import {LotCollection} from './models/business-model';
import UserView from './views/user';
// import {LotCollection} from './models/lots';


var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'parking': 'parking',
    'attendant': 'attendant',
    'business': 'business',
    'business/company/:company_id/lots': 'displayCompanyLots',
    'business/create': 'createForm',
    'business/:id/edit': 'editForm',
    'attendant/reservations': 'checkReservations'
  },

  index: function() {
    $('#app').html(JST.application);
  },

  business: function() {
    var lots = new LotCollection();
    lots.fetch();
    var view = new BusinessView({collection: lots});
    $('#app').html(view.el);
  },

  displayCompanyLots: function(id) {
    var lots = new LotCollection([
      {
        id: 1,
        company: 'Park Corp',
        company_id: 1,
        name: 'Hackathon',
        address: '101 North Main',
        availableSpaces: '12',
        hours: '8:00am to 6:00pm',
        price: '5.00'
      },
      {
      id: 2,
      company: 'Park Corp',
      company_id: 1,
      name: 'Hackathon',
      address: '101 North Main',
      availableSpaces: '12',
      hours: '8:00am to 6:00pm',
      price: '5.00'
      },
      {
      id: 3,
      company: 'Lot Corp',
      company_id: 2,
      name: 'Bay Lot',
      address: '101 South Main',
      availableSpaces: '24',
      hours: '8:00am to 6:00pm',
      price: '7.00'
      }
    ]);
    var view = new BusinessView({collection: lots});
    $('#app').html(view.el);
  },

  createForm: function() {
    var lots = new LotCollection();
    var view = new CreateView({collection: lots});
    $('#app').html(view.el);
  },

  editForm: function(id) {
    var lots = new LotCollection();
    lots.fetch().then(function(list) {
      var view = new EditView({
        collection: list,
        model: id
      });
      $('#app').html(view.el);
    });


  },
  attendant: function(){
    $('#app').html(new AttendantView().el);
  },

  checkReservations: function() {
    this.reservations = new Backbone.Collection();
    this.reservations.add([
      {id: 1, name: 'Johnson'},
      {id: 2, name: 'Hackett'}
    ]);
    console.log(this.reservations);
    $('#app').html(new AttendantReservationView({collection: this.reservations}).el);

  },



  parking: function() {
    console.log('parking');
  	// this.lots = new LotCollection();
   //    {'company': 'Best Parking EVAR!',
   //    'id': 1,
   //    'title': 'A parking lot',
   //    'address': '101 North Main Street Greenville, SC',
   //    'price': 5,
   //    'totalSpaces': 50,
   //    'spacesLeft': 45},
   //    {'company': 'Parking Company, Inc.',
   //    'id': 2,
   //    'title': 'Another parking lot',
   //    'address': '131 North Main Street Greenville, SC',
   //    'price': 4,
   //    'totalSpaces': 30,
   //    'spacesLeft': 15},
   //    ]
  	// );
  	// this.lots.fetch().then(function(response) {
  	// 	this.UserView = new UserView({collection: this.lots});
  	// 	$('#app').html(this.UserView.el);
  	// }.bind(this));
	// console.log('hi');
  }

});

var router = new Router();
export default router;
