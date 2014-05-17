'use strict';
module.exports = function(grunt) {
	grunt.initConfig({
    	clean: {
    		views: ["dist/**/*.html"],
    		styles: ['dist/assets/css'],
    		release: ["dist/assets"]
    	},
    	
    	copy: {
			assets: {
				files: [
					{expand: true, cwd: 'bower_components/bootstrap/dist/', src: ['**'], dest: 'dist/assets/bootstrap/'},
					{expand: true, cwd: 'bower_components/jquery/dist/', src: ['**'], dest: 'dist/assets/jquery/'}
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
    	
    	watch: {
    		views: {
    			files: 'src/views/**/*.jade',
    			tasks: ['clean:views', 'jade']
    		},
    		styles: {
    			files: 'src/styles/**/*.less',
    			tasks: ['clean:styles', 'less']
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
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	grunt.registerTask('default', ['clean', 'copy', 'jade', 'less', 'watch']);

};
