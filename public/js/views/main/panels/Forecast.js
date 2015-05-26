/*global define*/
var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: require('../../../templates/main/panels/forecast.tpl'),
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

      cm.setSize(null,375);
    });

    /**var self = this;
    $.ajax({
      error: function (jqXHR, textStatus, errorThrown) {
        alert('Server Error');
      },
      success: function (data, textStatus, jqXHR) {
        self.renderChart1(data.revenue);
      },
      type: 'POST',
      url: 'http://192.168.11.130:8055/api/query2'
    });*/
  },
  renderChart1: function(data) {
    var c = $(this.el).find('#forecast-revenue-chart');
    var margin = {top: 20, right: 20, bottom: 30, left: 100},
        width = c.width() - margin.left - margin.right,
        height = 320 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
              .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
              .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

    var svg = d3.select('#forecast-revenue-chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    x.domain(data.map(function(d) { return d.month; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Orders');

    svg.selectAll('.bar')
        .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) { return x(d.month); })
        .attr('width', x.rangeBand())
        .attr('y', function(d) { return y(d.value); })
        .attr('height', function(d) { return height - y(d.value); });

    function type(d) {
      d.value = +d.value;
      return d;
    }
  }
});