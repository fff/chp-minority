'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
    	
        clean: {
    		views: ["dist/**/*.html"],
    		styles: ['dist/assets/css'],
            images: ['dist/images'],
    		release: ["dist/assets"]
    	},
    	
    	copy: {
			assets: {
				files: [
					{expand: true, cwd: 'bower_components/bootstrap/dist/', src: ['**'], dest: 'dist/assets/bootstrap/'},
					{expand: true, cwd: 'bower_components/jquery/dist/', src: ['**'], dest: 'dist/assets/jquery/'},
				]
			}
    	},

		jade: {
	        compile: {
	            options: {
	            	client: false,
	                pretty: true,
	                wrap: 'amd'
	            },
	            files: grunt.file.expandMapping(['**/*.jade'], 'dist/', 
	            	{
	            		cwd: 'src/views', rename: function(destBase, destPath) {
                    		return destBase + destPath.replace(/\.jade$/, '.html'); } } )
	        }
    	},

    	less: {
    		dev: {
    			files: grunt.file.expandMapping(['**/*.less'], 'dist/assets/css/', 
	            	{
	            		cwd: 'src/styles', rename: function(destBase, destPath) {
                    		return destBase + destPath.replace(/\.less$/, '.css'); } } )
	        	}
    	},

        imagemin: {                          
            dynamic: {                       
                options: {                   
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,            
                    cwd: 'dist/images',       
                    src: ['**/*.{png,jpg}'],
                    dest: 'dist/images'         
              }]
            }
        },

        image_resize: {
            options: {
                width: 600,
                quality: 1,
                overwrite: true
            },
            resize: {
                files: [{
                    expand: true,
                    cwd: 'src/images',
                    src: ['**/*.{png,jpg}'],
                    dest: 'dist/images'
                }]
            }
        },
    	
    	watch: {
    		views: {
    			files: 'src/views/**/*.jade',
    			tasks: ['clean:views', 'jade']
    		},
    		styles: {
    			files: 'src/styles/**/*.less',
    			tasks: ['clean:styles', 'less']
    		},
            images: {
                files: 'src/images/**/*',
                tasks: ['clean:images', 'newer:image_resize','newer:imagemin']
            },
    		reload: {
    			files: 'dist/**/*',
    			options: {
    				livereload: true
    			}
    		}
    	}
	});

	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-image-resize');
	
    grunt.registerTask('release', ['clean', 'copy', 'jade', 'less', 'image_resize', 'imagemin'])
    grunt.registerTask('default', ['release', 'watch']);

};
