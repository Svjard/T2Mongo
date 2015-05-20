/*global define*/
var _ = require('underscore'),
    Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: require('../../../templates/main/panels/transactions.tpl'),
  className: 'panel-view',
  onShow: function() {
    var self = this;
    $.ajax({
      error: function (jqXHR, textStatus, errorThrown) {
        alert('Server Error');
      },
      success: function (data, textStatus, jqXHR) {
        var tableHtml = '';
        _.each(data.transactions, function(n) {
          html += '<tr>';
          html += '<td>' + n.Created + '</td>';
          html += '<td>' + n.OrderId + '</td>';
          html += '<td>' + n.CustomerId + '</td>';
          html += '<td>' + n.OrderNum + '</td>';
          html += '<td>' + n.Total + '</td>';
          html += '</tr>';
        });

        $(self.el).find('#table-transactions tbody').html(html);
      },
      type: 'POST',
      url: 'http://192.168.11.130:8055/api/query5'
    });
  }
});