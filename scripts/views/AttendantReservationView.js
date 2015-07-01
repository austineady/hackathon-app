/**
 * Created by firewaterjoe on 6/27/15.
 */
import ReservationSingleView from './ReservationSingleView';
export default Backbone.View.extend({
    template: JST.attendantReservations,
    events: {
        //'click .attendant-list-item': 'checkReservation'
    },

    initialize: function(){
        this.render();

    },
    render:function(){
        this.$el.html(this.template());
        this.renderChildren();
    },
    renderChildren: function(){
        _.invoke(this.children || [], 'remove');

        this.children = this.collection.map(function(child) {
            var view = new ReservationSingleView({
                collection: this.collection,
                model: child
            });

            this.$('.attendant-reservation-list').append(view.el);
            return view;
        }.bind(this));

        return this;
    },

    remove: function(){
        _.invoke(this.children || [], 'remove');
        Backbone.View.prototype.remove.apply(this, arguments);
    },
    checkReservation: function(){
        console.log(this);
    }
})