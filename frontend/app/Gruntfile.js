/*jshint node: true, -W106 */
'use strict';

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                'dest/output.min.js': ['src/input.js']
              }
            }
        }
    });
    /*  
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify: {
        options: {
          banner: '/! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> /\n'
        },
        build: {
          src: 'src/<%= pkg.name %>.js',
          dest: 'build/<%= pkg.name %>.min.js'
        }
      }
    });
    */
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-css');

    // Default task(s).
    grunt.registerTask('default', ['uglify',]);

};