/*global define*/
var d3 = require('d3'),
    Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: require('../../../templates/main/panels/performance.tpl'),
  className: 'panel-view',
  onShow: function() {
    var self = this;
    $.ajax({
      error: function (jqXHR, textStatus, errorThrown) {
        alert('Server Error');
      },
      success: function (data, textStatus, jqXHR) {
        this.renderChart1(data);
      },
      type: 'POST',
      url: 'http://192.168.11.130:8055/api/query4'
    });
  },
  addAxes: function(svg, xAxis, yAxis, margin, chartWidth, chartHeight) {
    // clipping to make sure nothing appears behind legend
    svg.append('clipPath')
      .attr('id', 'axes-clip')
      .append('polygon')
        .attr('points', (-margin.left)                 + ',' + (-margin.top)                 + ' ' +
                        (chartWidth - 1) + ',' + (-margin.top)                 + ' ' +
                        (chartWidth - 1) + ',' + 0                  + ' ' +
                        (chartWidth + margin.right)    + ',' + 0                  + ' ' +
                        (chartWidth + margin.right)    + ',' + (chartHeight + margin.bottom) + ' ' +
                        (-margin.left)                 + ',' + (chartHeight + margin.bottom));

    var axes = svg.append('g')
      .attr('clip-path', 'url(#axes-clip)');

    axes.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + chartHeight + ')')
      .call(xAxis);

    axes.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Time (ms)');
  },
  drawPaths: function(svg, data, x, y) {
    var upperOuterArea = d3.svg.area()
      .interpolate('basis')
      .x (function (d) { return x(d.date) || 1; })
      .y0(function (d) { return y(d.max); })
      .y1(function (d) { return y(d.avg); });

    var medianLine = d3.svg.line()
      .interpolate('basis')
      .x(function (d) { return x(d.date); })
      .y(function (d) { return y(d.avg); });

    var lowerOuterArea = d3.svg.area()
      .interpolate('basis')
      .x (function (d) { return x(d.date) || 1; })
      .y0(function (d) { return y(d.avg); })
      .y1(function (d) { return y(d.min); });

    svg.datum(data);

    svg.append('path')
      .attr('class', 'area upper outer')
      .attr('d', upperOuterArea)
      .attr('clip-path', 'url(#rect-clip)');

    svg.append('path')
      .attr('class', 'area lower outer')
      .attr('d', lowerOuterArea)
      .attr('clip-path', 'url(#rect-clip)');

    svg.append('path')
      .attr('class', 'median-line')
      .attr('d', medianLine)
      .attr('clip-path', 'url(#rect-clip)');
  },
  renderChart1: function(data) {
    var parseDate  = d3.time.format('%Y-%m-%d').parse;
    d3.json('data.json', function (error, rawData) {
      if (error) {
        console.error(error);
        return;
      }

      var data = rawData.map(function (d) {
        return {
          date:  parseDate(d.date),
          pct05: d.pct05 / 1000,
          pct25: d.pct25 / 1000,
          pct50: d.pct50 / 1000,
          pct75: d.pct75 / 1000,
          pct95: d.pct95 / 1000
        };
      });

      d3.json('markers.json', function (error, markerData) {
        if (error) {
          console.error(error);
          return;
        }

        var markers = markerData.map(function (marker) {
          return {
            date: parseDate(marker.date),
            type: marker.type,
            version: marker.version
          };
        });

        makeChart(data, markers);
      });
    });

    var svgWidth  = 960,
        svgHeight = 500,
        margin = { top: 20, right: 20, bottom: 40, left: 40 },
        chartWidth  = svgWidth  - margin.left - margin.right,
        chartHeight = svgHeight - margin.top  - margin.bottom;

    var x = d3.time.scale().range([0, chartWidth])
              .domain(d3.extent(data, function (d) { return d.date; })),
        y = d3.scale.linear().range([chartHeight, 0])
              .domain([0, d3.max(data, function (d) { return d.max; })]);

    var xAxis = d3.svg.axis().scale(x).orient('bottom')
                  .innerTickSize(-chartHeight).outerTickSize(0).tickPadding(10),
        yAxis = d3.svg.axis().scale(y).orient('left')
                  .innerTickSize(-chartWidth).outerTickSize(0).tickPadding(10);

    var svg = d3.select('body').append('svg')
      .attr('width',  svgWidth)
      .attr('height', svgHeight)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // clipping to start chart hidden and slide it in later
    var rectClip = svg.append('clipPath')
      .attr('id', 'rect-clip')
      .append('rect')
        .attr('width', 0)
        .attr('height', chartHeight);

    this.addAxes(svg, xAxis, yAxis, margin, chartWidth, chartHeight);
    this.drawPaths(svg, data, x, y);
  }
});