/*global define*/
var d3 = require('d3'),
    Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: require('../../../templates/main/panels/performance.tpl'),
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

      cm.setSize(null,250);
    });

    var self = this;
    $.ajax({
      error: function (jqXHR, textStatus, errorThrown) {
        alert('Server Error');
      },
      success: function (data, textStatus, jqXHR) {
        var tableHtml = '';
        _.each(data.pages, function(n) {
          tableHtml += '<tr>';
          tableHtml += '<td>' + n.TheDate + '</td>';
          tableHtml += '<td>' + n.Page + '</td>';
          tableHtml += '<td>' + n.Hits + '</td>';
          //tableHtml += '<td>' + n.Min + '</td>';
          tableHtml += '<td>' + n.Max + '</td>';
          tableHtml += '<td>' + n.Avg + '</td>';
          tableHtml += '<td>' + n.StdDev + '</td>';
          tableHtml += '</tr>';
        });

        $(self.el).find('#table-performance tbody').html(tableHtml);
      },
      type: 'POST',
      url: 'http://192.168.11.130:8055/api/query4'
    });
  }
});