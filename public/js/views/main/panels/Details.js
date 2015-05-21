/*global define*/
var _ = require('underscore'),
    Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: require('../../../templates/main/panels/details.tpl'),
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
    });

    var self = this;
    $.ajax({
      error: function (jqXHR, textStatus, errorThrown) {
        alert('Server Error');
      },
      success: function (data, textStatus, jqXHR) {
        var tableHtml = '';
        _.each(data.discounts, function(n) {
          tableHtml += '<tr>';
          tableHtml += '<td>' + n.Name + '</td>';
          tableHtml += '<td>' + n.Description + '</td>';
          tableHtml += '<td>' + n.Start + '</td>';
          tableHtml += '<td>' + n.End + '</td>';
          tableHtml += '<td>' + n.Code + '</td>';
          tableHtml += '<td>' + n.Amount + '</td>';
          tableHtml += '</tr>';
        });

        $(self.el).find('#table-discounts tbody').html(tableHtml);
      },
      type: 'POST',
      url: 'http://192.168.11.130:8055/api/query7'
    });
  }
});