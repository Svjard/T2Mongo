/*global define*/
var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: require('../../templates/nav/header.tpl'),
  events: {
    'click #leftmenu-trigger' : 'onToggleSidebar'
  },
  onToggleSidebar: function(ev) {
    ev.preventDefault();

    $('body').toggleClass('collapse-leftbar');
  }
});