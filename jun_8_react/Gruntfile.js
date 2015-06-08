'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    webpack: {
      client: {
        entry: __dirname + '/app/js/client.js',
        output: {
          path: 'build/',
          file: 'bundle.js'
        }
      },
      test: {
        entry: __dirname + '/test/client/test.js',
        output: {
          path: 'test/client/',
          file: 'test_bundle.js'
        }
      }
    },

    copy: {
      html: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: '**/*.html',
        dest: 'build/',
        filter: 'isFile'
      }
    },

    clean: {
      dev: {
        src: 'build/'
      }
    }
  });

  grunt.registerTask('build:dev', ['webpack:client', 'copy:html']);
  grunt.registerTask('build', ['build:dev']);
  grunt.registerTask('default', ['build']);
};
