/*global define*/
var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: require('../../templates/main/about.tpl'),
  className: 'panel-view'
});