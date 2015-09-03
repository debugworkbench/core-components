var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'dtsGenerator': {
      options: {
        baseDir: './',
        name: 'debug-workbench-core-components',
        out: './index.d.ts',
        excludes: [
          'typings/**',
          '!typings/lib.ext.d.ts',
          'node_modules/**'
        ]
      },
      default: {
        src: [
          'debug-configuration/debug-configuration.ts',
          'debug-toolbar/debug-toolbar.ts',
          'file-input/file-input.ts',
          'new-debug-config-dialog/new-debug-config-dialog.ts',
          'register-element/register-element.ts',
          'lib/element-factory.ts'
        ]
      }
    },
    'tsc': {
      options: {
        tscPath: path.resolve('node_modules', 'typescript', 'bin', 'tsc')
      },
      default: {}
    },
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
          // extract all inline JavaScript into a separate file to work around Atom's
          // Content Security Policy
          csp: 'dependencies_bundle.js'
        },
        files: {
          // output: input
          'dependencies_bundle.html': 'dependencies.html'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-tsc');
  grunt.loadNpmTasks('grunt-tsd');
  grunt.loadNpmTasks('dts-generator');
  grunt.loadNpmTasks('grunt-vulcanize');

  grunt.registerTask('default', ['vulcanize']);
};
