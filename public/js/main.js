window.paceOptions = {
  elements: false,
  restartOnRequestAfter: false,
  ajax: {
    trackMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    trackWebSockets: true
  }
};

window.Pace.start();

PNotify.prototype.options.styling = 'bootstrap3';

jQuery.fn.center = function () {
  this.css('position','absolute');
  this.css('top', Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
    $(window).scrollTop()) + 'px');
  this.css('left', Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
    $(window).scrollLeft()) + 'px');
  this.toggleClass('hidden');
  return this;
};

var App = require('./app');
var myapp = new App();
myapp.start();
