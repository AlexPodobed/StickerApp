/*function template(id) {
        _.templateSettings = {
                interpolate: /\{\{(.+?)\}\}/g
        };
        return _.template($('#' + id).html());
}*/

var     StickView = Backbone.View.extend({
                className: 'sticker',

                events: {
                        'click': 'stopBubbling',
                        'click .remove': 'removeStick',
                        'blur textarea': 'saveText'
                },


                template: _.template('<span class="draggable"></span><span class="remove">X</span><textarea></textarea>'),

                render: function() {
                        this.setPosition();
                        this.$el.html(this.template());
                        this.makeItDraggable();
                        return this;
                },

                setPosition: function() {
                        this.$el.css({
                                left: this.model.get('position_x') + 'px',
                                top: this.model.get('position_y') + 'px'
                        });
                },

                makeItDraggable: function(){
                        var width = $('#sticker-board').width(),
                        height = $('#sticker-board').height();
                        this.$el.draggable({
                                drag: function(event, ui) {
                                        if (ui.position.left > width || ui.position.top > height) {
                                                this.$el.animate({opacity: 0.1}, 800, function  () {
                                                        this.removeStick();
                                                }.bind(this))
                                        }
                                }.bind(this)
                        }).css('position', 'absolute');
                },

                removeStick: function() {
                        this.model.destroy();
                        this.$el.remove();
                        return false;
                },

                saveText: function() {
                        var text = this.$el.find('textarea').val();
                        this.model.set('text', text);
                        this.model.save();
                },

                stopBubbling: function() {
                        return false;
                }

        }),
// C O L L E C T I O N       V I E W
        SticksView = Backbone.View.extend({
                initialize: function() {
                        var self = this;
                        this.collection = new Sticks();
                        this.collection.fetch();
                        this.collection.on('reset', function () {
                                 $.each(this.models, function  () {
                                        var sV = new StickView({model: this})
                                        self.$el.append(sV.render().el)
                                })
                        })
                },

                events: {
                        'click': 'addStick',
                        'contextmenu': 'checkCollection'
                },

                addStick: function(e) {
                        var coords = this.getCoords(e);
                                // stick = new Stick({position_x: coords.x, position_y: coords.y}),
                                // stickView = new StickView({model: stick});
                        this.per_model = new Stick({position_x: coords.x, position_y: coords.y})
                        this.per_view = new StickView({model: this.per_model});
                         this.per_model.save();
                        this.collection.add(this.per_model);
                        this.$el.append( this.per_view.render().el);
                },

                getCoords: function(e) {
                        return {
                                x: e.pageX,
                                y: e.pageY
                        };
                },

                checkCollection: function  () {
                        this.collection.fetch();

                        this.collection.on('reset', function () {
                                console.log(this)
                        })

                        return false;
                }

        }, {per_model: undefined, per_view: undefined});