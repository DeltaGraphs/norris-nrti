/*jshint node: true, -W106 */
'use strict';

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        concat: {
            css: {
                src: ['./View/**/*.css'], // array of folders
                dest: './dist/tmp/concat.css'
            },
            js: {
                src: ['./norris-nrti.js','./Model/**/*.js','./Controller/**/*.js','./View/**/*.js'], // array of folders
                dest: './dist/tmp/concat.js'
            }
        },
        cssmin: {
            css: {
                files: {
                    './dist/norris-nrti.min.css': [ './dist/tmp/concat.css' ]
                }
            }
        },
        min: {
            js: {
                    src: 'dist/js/concat.js',
                    dest: 'dist/js/norris-nrti.min.js'
                }
            }
        }
    );
    

    /*  

uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dist/output.min.js': ['src/input.js']
                }
            }
        },




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

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', ['concat','cssmin','uglify']);

};