// Need to add another task that will create a local
// copy of specified mongo databases (+ collections optionally)
// Need to add another task that will provide "localhost"
// everywhere for the MongoDB connection if running in dev, or
// inject it into the code
module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower: {
      install: {
        options: {
          targetDir: 'public/vendor',
          layout: 'byComponent'
        }
      }
    },

    clean: ['public/build','public/dist'],

    browserify: {
      vendor: {
        src: [
          'public/vendor/backbone/backbone.js',
          'public/vendor/bootstrap/dist/js/bootstrap.js',
          'public/vendor/bootstrap-datepicker/js/bootstrap-datepicker.js',
          'public/vendor/codemirror/lib/codemirror.js',
          'public/vendor/codemirror/mode/sql/sql.js',
          'public/vendor/d3/d3.js',
          'public/vendor/jquery/dist/jquery.js',
          'public/vendor/lodash/lodash.js',
          'public/vendor/marionette/lib/backbone.marionette.js',
          'public/vendor/moment/min/moment-with-locales.js',
          'public/vendor/numeral/numeral.js',
          'public/vendor/pace/pace.js',
          'public/vendor/pnotify/pnotify.core.js'
        ],
        dest: 'public/build/vendor.js',
        options: {
          shim: {
            backbone: {
              path: 'public/vendor/backbone/backbone.js',
              exports: 'Backbone',
              depends: {
                jquery: 'jQuery',
                underscore: '_'
              }
            },
            bootstrap: {
              path: 'public/vendor/bootstrap/dist/js/bootstrap.js',
              exports: null,
              depends: {
                jquery: 'jQuery'
              }
            },
            'bootstrap.datepicker': {
              path: 'public/vendor/bootstrap-datepicker/js/bootstrap-datepicker.js',
              exports: null,
              depends: {
                bootstrap: 'bootstrap',
                jquery: 'jQuery'
              }
            },
            codemirror: {
              path: 'public/vendor/codemirror/lib/codemirror.js',
              exports: 'CodeMirror'
            },
            'codemirror.sql': {
              path: 'public/vendor/codemirror/mode/sql/sql.js',
              exports: null,
              depends: {
                codemirror: 'CodeMirror'
              }
            },
            d3: {
              path: 'public/vendor/d3/d3.js',
              exports: 'd3'
            },
            jquery: {
              path: 'public/vendor/jquery/dist/jquery.js',
              exports: 'jQuery'
            },
            marionette: {
              path: 'public/vendor/marionette/lib/backbone.marionette.js',
              exports: 'Marionette',
              depends: {
                jquery: 'jQuery',
                backbone: 'Backbone',
                underscore: '_'
              }
            },
            moment: {
              path: 'public/vendor/moment/min/moment-with-locales.js',
              exports: null
            },
            numeral: {
              path: 'public/vendor/numeral/numeral.js',
              exports: null
            },
            pace: {
              path: 'public/vendor/pace/pace.js',
              exports: null
            },
            pnotify: {
              path: 'public/vendor/pnotify/pnotify.core.js',
              exports: 'PNotify',
              depends: {
                jquery: 'jQuery'
              }
            },
            underscore: {
              path: 'public/vendor/lodash/lodash.js',
              exports: '_'
            }
          }
        }
      },
      app: {
        files: {
          'public/build/app.js': ['public/js/main.js']
        },
        options: {
          transform: ['node-underscorify', 'require-globify'],
          external: ['backbone', 'bootstrap', 'bootstrap.datepicker', 'codemirror', 'codemirror.sql', 'd3', 'jquery', 'marionette', 'moment', 'numeral', 'pace', 'pnotify', 'underscore']
        }
      },
      test: {
        files: {
          'public/build/tests.js': [
            'client/spec/**/*.test.js'
          ]
        },
        options: {
          transform: ['node-underscorify', 'require-globify'],
          external: ['backbone', 'bootstrap', 'bootstrap.datepicker', 'codemirror', 'codemirror.sql', 'd3', 'jquery', 'marionette', 'moment', 'numeral', 'pace', 'pnotify', 'underscore']
        }
      }
    },

    less: {
      transpile: {
        files: {
          'public/build/<%= pkg.name %>.css': [
            'public/less/style.less'
          ]
        }
      }
    },

    concat: {
      'public/build/<%= pkg.name %>.js': ['public/build/vendor.js', 'public/build/app.js']
    },

    copy: {
      target: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'public/',
          src: ['images/*'],
          dest: 'public/dist/images/'
        },{
          expand: true,
          flatten: true,
          cwd: 'public/',
          src: ['vendor/font-awesome/fonts/*'],
          dest: 'public/dist/vendor/font-awesome/fonts/'
        }]
      }
    },

    // CSS minification.
    cssmin: {
      minify: {
        src: ['public/build/<%= pkg.name %>.css'],
        dest: 'public/dist/css/<%= pkg.name %>.css'
      }
    },

    // Javascript minification.
    uglify: {
      compile: {
        options: {
          compress: true,
          verbose: true
        },
        files: [{
          src: 'public/build/<%= pkg.name %>.js',
          dest: 'public/dist/js/<%= pkg.name %>.js'
        }]
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'public/js/**/*.js']
    }
  });

  grunt.registerTask('init', ['clean', 'bower', 'browserify:vendor']);
  //grunt.registerTask('build', ['clean', 'browserify:vendor', 'browserify:app',  'less:transpile', 'concat', 'cssmin', 'uglify', 'copy']);
  grunt.registerTask('build', ['clean', 'browserify:vendor', 'browserify:app',  'less:transpile', 'concat', 'cssmin', 'copy']);
};