var Backbone = require('backbone'),
    Marionette = require('marionette'),
    pj = require('./package.json'),
    vent = require('./vent');

module.exports = App = function App() {};

function resize() {
  var h = $(window).height() - $('#topnav').height();
  $('#page-container').height(h);
}

function changeNav(id) {
  $('.acc-menu li').removeClass('open').removeClass('active');
  if (id === 'quarterly' || id === 'forecast') {
    $('#revenue-menu-item').addClass('open');
  }
  else if (id === 'userstats' || id === 'performance') {
    $('#website-menu-item').addClass('open');
  }
  else if (id === 'details' || id === 'channels') {
    $('#campaigns-menu-item').addClass('open');
  }

  $('#' + id + '-menu-item').addClass('active');
}

App.prototype.start = function() {
  App.core = new Marionette.Application();

  App.core.addRegions({
    header:     '#topnav',
    main:       '#page-content',
    sidebar:    '#page-leftbar',
    modal:      '#modal'
  });

  App.core.addInitializer(function () {
    vent.trigger('app:log', 'App: Initializing');
    App.views = require('./views/**/*.js', {hash: 'path'});
    App.data = {};
    vent.trigger('app:start');
  });

  vent.bind('app:start', function(options) {
    vent.trigger('app:log', 'App: Starting');

    $(window).on('resize.main', resize);

    $(document).ajaxStart(function() { window.Pace.restart(); });

    App.core.header.show(new App.views['views/nav/Header.js']({ 'model': new Backbone.Model({ 'title': pj.title }) }));
    App.core.sidebar.show(new App.views['views/nav/Sidebar.js']());

    App.router = new (Backbone.Router.extend({
      initialize: function () {
        var self = this;

        this.route(/^panel(?:\/([a-z]+))$/, 'panel', function (id) {
          App.core.main.show(new App.views['views/main/panels/' + id.charAt(0).toUpperCase() + id.slice(1) + '.js']());
          changeNav(id);
        });

        this.route(/^home$/, 'home', function () {
          App.core.main.show(new App.views['views/main/Home.js']());
        });
      }
    }))();

    resize();

    if (!Backbone.history.start()) {
      vent.trigger('app:log', 'App: Backbone.history starting');
      App.router.navigate('#/home', { 'trigger': true });
    }
    
    vent.trigger('app:log', 'App: Done starting and running!');
  });

  vent.bind('app:log', function(msg) {
    console.log(msg);
  });

  App.core.start();
};
