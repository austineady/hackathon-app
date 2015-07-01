/**
 * Created by firewaterjoe on 6/27/15.
 */
export default Backbone.View.extend({
    template: JST.attendantReservationSingle,
    tagName: 'li',
    className: 'attendant-list-item',
    events: {
        'click': 'dude'
    },

    initialize:function(){

        this.render();
    },
    render:function(){
        this.$el.html(this.template(this.model.toJSON()));
    },
    dude: function(){
        this.id = this.model.toJSON().id;
        console.log(this.id);
        console.log(this.collection);

        this.aModel = _.filter(this.collection.models, function(param){
            //console.log(param);
            if(param.id===this.id) {
                return param
            };
        
        }.bind(this));

        //console.log(model);
        //this.collection.

        //console.log('collection',this.collection);
        //console.log('model', this.model);
        //var id = this.model.attributes.id;
        //this.collection.destroy(this.aModel.id);
    }

});
