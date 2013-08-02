var Stick = Backbone.Model.extend({
        defaults: {
                text: '',
                position_x:0,
                position_y:0
        },

        urlRoot: "/stickers"

});