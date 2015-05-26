/*global define*/
var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: require('../../../templates/main/panels/forecast.tpl'),
  className: 'panel-view',
  onShow: function() {
    _.each(_.range(1), function(n) {
      CodeMirror.fromTextArea(document.getElementById('block' + (n + 1)), {
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        theme: 'eclipse',
        mode: 'text/x-sql'
      });

      cm.setSize(null,250);
    });
  }
});