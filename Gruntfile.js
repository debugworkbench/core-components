module.exports = function(grunt) {
  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
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

  grunt.loadNpmTasks('grunt-vulcanize');

  grunt.registerTask('default', ['vulcanize']);
};
