/*global define*/
var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: require('../../templates/main/home.tpl'),
  className: 'panel-view',
  events: {
    'click #history-title' : 'onHistoryToggle'
  },
  onHistoryToggle: function() {
    $(this.el).find('#history-section').toggle();
  }
});