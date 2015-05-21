/*global define*/
var d3 = require('d3'),
    Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: require('../../../templates/main/panels/userstats.tpl'),
  className: 'panel-view',
  onShow: function() {
    var self = this;
    $.ajax({
      error: function (jqXHR, textStatus, errorThrown) {
        alert('Server Error');
      },
      success: function (data, textStatus, jqXHR) {
        self.renderChart1(data.hits);
        self.renderChart2(data.bounces, '#bounce-rate-chart', 'Bounces');
        self.renderChart2(data.sessions, '#session-time-chart', 'Time (ms)');
      },
      type: 'POST',
      url: 'http://192.168.11.130:8055/api/query3'
    });
  },
  renderChart1: function(data) {
    var c = $(this.el).find('#user-hits-chart');
    var margin = {top: 20, right: 20, bottom: 30, left: 100},
        width = c.width() - margin.left - margin.right,
        height = 320 - margin.top - margin.bottom;

    var parseDate = d3.time.format('%Y-%m').parse;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

    var line = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); });

    var svg = d3.select('#user-hits-chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.value = +d.value;
    });

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, 1500]);

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
        .text('# of Hits');

    svg.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line);
  },
  renderChart2: function(data, chart, xax) {
    var c = $(this.el).find(chart);
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

    /*var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return '<strong>Orders:</strong> <span style='color:red'>' + d.orders + '</span>';
      });*/

    var svg = d3.select(chart).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    //svg.call(tip);

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
        .text(xax);

    svg.selectAll('.bar')
        .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) { return x(d.month); })
        .attr('width', x.rangeBand())
        .attr('y', function(d) { return y(d.value); })
        .attr('height', function(d) { return height - y(d.value); });
      //.on('mouseover', tip.show)
      //.on('mouseout', tip.hide);

    function type(d) {
      d.value = +d.value;
      return d;
    }
  }
});