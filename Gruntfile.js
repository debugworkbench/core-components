module.exports = function(grunt) {
  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'tsd': {
      lib: {
        options: {
          command: 'reinstall',
          latest: true,
          config: 'conf/tsd-lib.json',
          opts: {
            // props from tsd.Options
          }
        }
      }
    },
    'vulcanize': {
      default: {
        options: {
          csp: 'dependencies_bundle.js'
        },
        files: {
          'dependencies_bundle.html': 'dependencies.html'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-tsd');
  grunt.loadNpmTasks('grunt-vulcanize');

  grunt.registerTask('default', ['vulcanize']);
};
