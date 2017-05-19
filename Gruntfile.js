'use strict';

module.exports = function(grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);

  // load tasks on demand (speeds up dev)
  require('jit-grunt')(grunt, {
    browserSync: 'grunt-browser-sync'
  });

  grunt.initConfig({
    yeoman: {
      src: 'src',
      dist: 'dist',
      test: 'test',
      pkg: grunt.file.readJSON('package.json'),
      meta: {
        banner: '/*! <%= yeoman.pkg.name %> - v<%= yeoman.pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '* <%= yeoman.pkg.homepage %>\n' +
          '* Copyright © <%= grunt.template.today("yyyy") %> ' +
          '<%= yeoman.pkg.author.name %>; Licensed <%= yeoman.pkg.license %> */\n'
      },
    },
    watch: {
      qa: {
        files: [
          '<%= yeoman.src %>/iptools-jquery-tooltip.js',
          '<%= yeoman.test %>/index.html',
          '<%= yeoman.test %>/spec/*.js'
        ],
        tasks: ['concurrent:qa']
      },
      bdd: {
        files: [
          '<%= yeoman.src %>/iptools-jquery-tooltip.js',
          '<%= yeoman.test %>/index.html',
          '<%= yeoman.test %>/spec/*.js'
        ],
        tasks: ['test']
      },
      server: {
        files: [
          '<%= yeoman.src %>/iptools-jquery-tooltip.scss',
          '<%= yeoman.src %>/iptools-jquery-tooltip.js'
        ],
        tasks: ['concurrent:build']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.src %>/{,*/}*.js',
        '<%= yeoman.test %>/spec/{,*/}*.js'
      ]
    },
    mocha: {
      all: {
        options: {
          run: true,
          log: true
        },
        src: ['<%= yeoman.test %>/index.html']
      }
    },
    concurrent: {
      qa: {
        tasks: [
          'jshint',
          'jscs',
          'mocha'
        ]
      },
      build: {
        tasks: [
          'uglify',
          'sass'
        ]
      }
    },
    uglify: {
      options: {
        banner: '<%= yeoman.meta.banner %>'
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/iptools-jquery-tooltip.min.js': '<%= yeoman.src %>/iptools-jquery-tooltip.js'
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.dist %>/*.{css,js,map}'
          ]
        }]
      }
    },
    sass: {
      dist: {
        files: {
          '<%= yeoman.dist %>/iptools-jquery-tooltip.css' : '<%= yeoman.src %>/iptools-jquery-tooltip.scss'
        }
      }
    },
    jscs: {
      options: {
        config: '.jscsrc'
      },
      files: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.test %>/spec/*.js',
          '<%= yeoman.src %>/*.js'
        ]
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'dist/iptools-jquery-tooltip.css',
            'dist/iptools-jquery-tooltip.min.js',
            'dist/index.html'
          ]
        },
        options: {
          watchTask: false,
          server: './dist'
        }
      }
    }
  });

  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('qa', ['concurrent:qa']);

  grunt.registerTask('build', [
    'concurrent:qa',
    'clean:dist',
    'concurrent:build'
  ]);

  grunt.registerTask('default', ['build']);

  grunt.registerTask('travis', ['concurrent:qa']);

  grunt.registerTask('serve', 'Start server. Use --allow-remote for remote access', function() {
    grunt.task.run([
      'clean:dist',
      'concurrent:build',
      'browserSync',
      'watch:server'
    ]);
  });
};
