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
          tableHtml += '<tr>';
          tableHtml += '<td>' + n.Created + '</td>';
          tableHtml += '<td>' + n.OrderId + '</td>';
          tableHtml += '<td>' + n.CustomerId + '</td>';
          tableHtml += '<td>' + n.OrderNum + '</td>';
          tableHtml += '<td>' + n.DiscountCode + '</td>';
          tableHtml += '<td>' + n.Total + '</td>';
          tableHtml += '</tr>';
        });

        $(self.el).find('#table-transactions tbody').html(tableHtml);
      },
      type: 'POST',
      url: 'http://192.168.11.130:8055/api/query5'
    });
  }
});