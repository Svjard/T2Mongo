/*global define*/
var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: require('../../templates/nav/sidebar.tpl'),
  events: {
    'click .hasChild' : 'onToggleMenuItem'
  },
  onToggleMenuItem: function(ev) {
    ev.stopImmediatePropagation();
    $(ev.currentTarget).toggleClass('open').find('.acc-menu').toggle();
  }
});