/*global define*/
var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: require('../../../templates/main/panels/nextsteps.tpl'),
  className: 'panel-view'
});