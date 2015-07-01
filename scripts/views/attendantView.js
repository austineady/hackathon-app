/**
 * Created by firewaterjoe on 6/26/15.
 */
var AttendantView =Backbone.View.extend({
    template: JST.attendant,
    className: 'attendant-container',
    events: {
        'click .attendant-car-in': 'carIn',
        'click .attendant-car-out': 'carOut'
    },
    initialize: function(){
        this.carMax = 55;

        this.cars = 30;
        this.reserved= this.collection.length;
        this.available = this.calculateAvailable();

        this.render();
    },

    render: function(){
        this.$el.html(JST['attendant']({
            "cars":this.available,
            'reserved':this.reserved
        }));
    },
    carIn: function(){
        this.available = $('.attendant-spots-left').text();
        this.cars -= 1;
        this.available = this.calculateAvailable();
        if(this.available >= 0) {
            this.render();
        }else {
            this.cars += 1;
            this.available = this.calculateAvailable();
        }


    },
    carOut: function(){
        this.available = $('.attendant-spots-left').text();
        this.cars += 1;
        this.available = this.calculateAvailable();
        if(this.available <= this.carMax){
            this.render(this.available);
        }else {
            this.cars -= 1;
            this.available = this.calculateAvailable();
        }

    },
    calculateAvailable: function(){
        return  this.cars - this.reserved;
    }
});
export default AttendantView;