/*global define*/
var d3 = require('d3'),
    Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: require('../../../templates/main/panels/quarterly.tpl'),
  className: 'panel-view',
  onShow: function() {
    var data = {
      'revenue': [
        {'month': '01-2015', revenue: 1459038},
        {'month': '02-2015', revenue: 1311231},
        {'month': '03-2015', revenue: 1456916},
        {'month': '04-2015', revenue: 1409436},
        {'month': '05-2015', revenue: 995664},
        {'month': '06-2015', revenue: 6046}
      ],
      'orders': [
        {'month': 'Jan', orders: 21550},
        {'month': 'Feb', orders: 19594},
        {'month': 'Mar', orders: 21720},
        {'month': 'Apr', orders: 20989},
        {'month': 'May', orders: 14719},
        {'month': 'Jun', orders: 95}
      ]
    };

    this.renderChart1(data.revenue);
    this.renderChart2(data.orders);
  },
  renderChart1: function(data) {
    var c = $(this.el).find('#quarterly-revenue-chart');
    var margin = {top: 20, right: 20, bottom: 30, left: 100},
        width = c.width() - margin.left - margin.right,
        height = 320 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%m-%Y").parse;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .x(function(d) { return x(d.month); })
        .y(function(d) { return y(d.revenue); });

    var svg = d3.select("#quarterly-revenue-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data.forEach(function(d) {
      d.month = parseDate(d.month);
      d.revenue = +d.revenue;
    });

    x.domain(d3.extent(data, function(d) { return d.month; }));
    y.domain(d3.extent(data, function(d) { return d.revenue; }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Revenue ($USD)");

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);
  },
  renderChart2: function(data) {
    var c = $(this.el).find('#quarterly-orders-chart');
    var margin = {top: 20, right: 20, bottom: 30, left: 100},
        width = c.width() - margin.left - margin.right,
        height = 320 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
              .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
              .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    /*var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Orders:</strong> <span style='color:red'>" + d.orders + "</span>";
      });*/

    var svg = d3.select("#quarterly-orders-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //svg.call(tip);

    x.domain(data.map(function(d) { return d.month; }));
    y.domain([0, d3.max(data, function(d) { return d.orders; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Orders");

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.month); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.orders); })
        .attr("height", function(d) { return height - y(d.orders); });
      //.on('mouseover', tip.show)
      //.on('mouseout', tip.hide);

    function type(d) {
      d.orders = +d.orders;
      return d;
    }
  }
});