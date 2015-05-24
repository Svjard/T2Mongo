/*global define*/
var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: require('../../../templates/main/panels/channels.tpl'),
  className: 'panel-view',
  onShow: function() {
    _.each(_.range(1), function(n) {
      var cm = CodeMirror.fromTextArea(document.getElementById('block' + (n + 1)), {
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        theme: 'eclipse',
        mode: 'text/x-sql'
      });

      cm.setSize(null,225);
    });

    var self = this;
    $.ajax({
      error: function (jqXHR, textStatus, errorThrown) {
        alert('Server Error');
      },
      success: function (data, textStatus, jqXHR) {
        var tableHtml = '';
        _.each(data.channels, function(n) {
          tableHtml += '<tr>';
          tableHtml += '<td>' + n.Referrer + '</td>';
          tableHtml += '<td>' + n.Count + '</td>';
          tableHtml += '</tr>';
        });

        $(self.el).find('#table-channels tbody').html(tableHtml);
      },
      type: 'POST',
      url: 'http://192.168.11.130:8055/api/query6'
    });
  }
});