# core-components
Core Debug Workbench web components shared by the various integrations. These components only work
in Electron-based applications.

Usage
=====

Prerequisites
-------------
- [Electron](https://github.com/atom/electron/)

Development
===========

Prerequisites
-------------
- NPM
- Grunt
- Bower

Setup
-----
1. Install all Bower dependencies by executing `bower install`.
2. Install all Node dependencies by executing `npm install`.
3. Vulcanize the Polymer web components by executing `grunt`, this will create
`dependencies_bundle.html` and `dependencies_bundle.js`.

Note that there's a bug related to the `abspath` option in `Vulcanize 1.10.3` that causes
relative URLs to be output with a `/` prefix, this breaks things when loading the dependencies
bundle in Atom. This bug was fixed in the
[master branch](https://github.com/Polymer/vulcanize/commit/08c56b8576bcb6d8be2ad82ad6885d9e705ee1a9)
shortly after `Vulcanize 1.10.3` was released, but there hasn't been a new release with the bug
fix yet so until then you'll need to replace the version installed by NPM with the one on GitHub.
To do so navigate to the `node_modules/grunt-vulcanize` directory and execute
`npm install Polymer/vulcanize`.

Updating Polymer Elements
-------------------------
1. Execute `bower update` to download updated Polymer web components.
2. Execute `grunt vulcanize` to update `dependencies_bundle.html` and `dependencies_bundle.js`.
