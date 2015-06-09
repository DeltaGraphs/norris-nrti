/*jshint node: true, -W106 */
'use strict';

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        concat: {
            css: {
                src: ['frontend/app/View/**/*.css'], // array of folders
                dest: 'frontend/app/dist/norris-nrti.css'
            },
            js: {
                src: [ // array of folders
                    'frontend/app/norris-nrti.js',
                    'frontend/app/Model/**/*.js',
                    'frontend/app/Controller/**/*.js',
                    'frontend/app/View/**/*.js'
                ],
                dest: 'frontend/app/dist/norris-nrti.js'
            }
        },
        cssmin: {
            dist: {
                files: {
                    'frontend/app/dist/norris-nrti.min.css': [ 'frontend/app/dist/norris-nrti.css' ]
                }
            }
        },
        uglify: {
            build: {
                files: {
                    'frontend/app/dist/norris-nrti.min.js': ['frontend/app/dist/norris-nrti.js']
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', ['concat','cssmin','uglify']);

};