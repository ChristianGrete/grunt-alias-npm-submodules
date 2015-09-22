# grunt-alias-npm-submodules

[![Latest GitHub Tag](https://img.shields.io/github/tag/ChristianGrete/grunt-alias-npm-submodules.svg)](https://github.com/ChristianGrete/grunt-alias-npm-submodules/tags)
[![Latest GitHub Release](https://img.shields.io/github/release/ChristianGrete/grunt-alias-npm-submodules.svg)](https://github.com/ChristianGrete/grunt-alias-npm-submodules/releases/latest)
[![Total Downloads via GitHub](https://img.shields.io/github/downloads/ChristianGrete/grunt-alias-npm-submodules/latest/total.svg)](https://github.com/ChristianGrete/grunt-alias-npm-submodules/releases)
[![Node.js Module Version](https://img.shields.io/npm/v/grunt-alias-npm-submodules.svg)](https://www.npmjs.com/package/grunt-alias-npm-submodules)
[![Downloads via npm per Month](https://img.shields.io/npm/dm/grunt-alias-npm-submodules.svg)](https://www.npmjs.com/package/grunt-alias-npm-submodules)

> Alias npm submodules located in subdirectories

__grunt-alias-npm-submodules__ is a [Grunt](http://gruntjs.com) plugin. It creates alias script files in the root directory of your [npm](https://www.npmjs.com/) module that forward to submodules located in subdirectories to make them accessible using the npm module’s name:
```js
// Use this:
require('your-module/submodule');

// Instead of this:
require('your-module/subdirectory/submodule');
```

## Getting Started

If you haven't used [Grunt](http://gruntjs.com) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:
```shell
npm install --save-dev grunt-alias-npm-submodules@latest
```
Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:
```js
grunt.loadNpmTasks('grunt-alias-npm-submodules');
```

### Alias task
_Run this task with the `grunt alias` command._
Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
#### Options
##### level
Type: `Number` or numeric `String`
Default: `1`
The level(s) of how deep the target file is nested in subdirectories.
#### Usage Examples
This will create a `submodule.js` alias file in the root directory:
```js
alias: {
  options: {
    levels: 2
  },
  partial: 'level_1/level_2/submodule.js'
},
```
Result:
```sh
.
├── submodule.js # The alias file
└── level_1/
    └── level_2/
        └── submodule.js
```
When changing `options.levels` to `1`, the result will be:
```sh
.
├── level_2 # The alias subdirectory
│   └── submodule.js # The alias file
└── level_1/
    └── level_2/
        └── submodule.js
```

## Policy

This is communist software. It is crafted with heart and soul to the best of the author’s knowledge and belief: _Not for profit but to satisfy the concrete needs._ Do whatever you want with it (as long as you keep the author’s copyright notice in all copies or substantial portions of it included) for free. Imagine how the world could be if others would produce and distribute their products for the same benefits and ask yourself why they’re actually not.

## License

This software is licensed under [MIT License](LICENSE.md).

Copyright © 2015 [Christian Grete](https://christiangrete.com)
- [GitHub](https://github.com/ChristianGrete)
- [npm](https://www.npmjs.com/~christiangrete)
- [Twitter](https://twitter.com/ChristianGrete)
- [XING](https://www.xing.com/profile/Christian_Grete2)