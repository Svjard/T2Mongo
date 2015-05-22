/*global define*/
var Marionette = require('marionette'),
    vent = require('../../vent');

module.exports = Marionette.ItemView.extend({
  template: require('../../templates/nav/header.tpl'),
  events: {
    'click #leftmenu-trigger' : 'onToggleSidebar',
    'click #prev-page' : 'onPrevPage',
    'click #next-page' : 'onNextPage'
  },
  onToggleSidebar: function(ev) {
    ev.preventDefault();

    $('body').toggleClass('collapse-leftbar');
  },
  onPrevPage: function(ev) {
    ev.preventDefault();
    if (!$(ev.currentTarget).hasClass('disabled')) {
      vent.trigger('page:prev');
    }
  },
  onNextPage: function(ev) {
    ev.preventDefault();
    if (!$(ev.currentTarget).hasClass('disabled')) {
      vent.trigger('page:next');
    }
  }
});