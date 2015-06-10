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
            cssComplete: {
                src: ['frontend/app/View/**/*.css','bower_components/bootstrap/dist/css/bootstrap.min.css'], // array of folders
                dest: 'frontend/app/dist/norris-nrti.complete.css'
            },
            js: {
                src: [ // array of folders
                    'frontend/app/norris-nrti.js',
                    'frontend/app/Model/**/*.js',
                    'frontend/app/Controller/**/*.js',
                    'frontend/app/View/**/*.js'
                ],
                dest: 'frontend/app/dist/norris-nrti.js'
            },
            jsComplete: {
                src: [ // array of folders
                    'frontend/app/norris-nrti.js',
                    'frontend/app/Model/**/*.js',
                    'frontend/app/Controller/**/*.js',
                    'frontend/app/View/**/*.js',
                    'frontend/app/bower_components/sio-client/socket.io.js',
                    'frontend/app/bower_components/angular/angular.min.js',
                    'frontend/app/bower_components/jquery/dist/jquery.min.js',
                    'frontend/app/bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'frontend/app/bower_components/angular-route/angular-route.js',
                    'frontend/app/bower_components/d3/d3.min.js',
                    'frontend/app/bower_components/angular-smart-table/dist/smart-table.min.js',
                ],
                dest: 'frontend/app/dist/norris-nrti.complete.js'
            }
        },
        cssmin: {
            dist: {
                files: {
                    'frontend/app/dist/norris-nrti.min.css': [ 'frontend/app/dist/norris-nrti.css' ],
                    'frontend/app/dist/norris-nrti.complete.min.css': [ 'frontend/app/dist/norris-nrti.complete.css' ]
                }
            }
        },
        uglify: {
            build: {
                files: {
                    'frontend/app/dist/norris-nrti.min.js': ['frontend/app/dist/norris-nrti.js'],
                    'frontend/app/dist/norris-nrti.complete.min.js': ['frontend/app/dist/norris-nrti.complete.js']
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