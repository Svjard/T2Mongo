/*global define*/
var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: require('../../../templates/main/panels/nextsteps.tpl'),
  className: 'panel-view',
  onShow: function() {
    _.each(_.range(4), function(n) {
      CodeMirror.fromTextArea(document.getElementById('block' + (n + 1)), {
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        theme: 'eclipse',
        mode: 'text/x-sql'
      });

      if (n === 0) {
        cm.setSize(null,325);
      }
      else {
        cm.setSize(null,175);
      }
    });
  }
});