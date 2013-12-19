Filefetcher.js
==============

Recursive / non-recursive file collector (any file type). Sends full path of each file to your callback.

[![NPM](https://nodei.co/npm/filefetcher.png?downloads=true)](https://nodei.co/npm/filefetcher/)

## Description

Finds files having a specified extension, and passes the full path to the file as the
argument to the callback that you provide. Also runs recursively if recursive is true.
This allows automated loading of project files according to your own rules.

Works really well with easyioc ([git](http://github.com/rm-rf-etc/easyioc)) ([npm](http://npmjs.org/package/easyioc)), allowing you to quickly specify exactly how to load your entire node.js project, without any redundant manual require() blocks.

## Usage

```js
var filefetcher = require('filefetcher')

var results = []
function customModuleInclude (file) { results.push(file) /* or whatever you want */ }

filefetcher([
    { path:'./relative-path1', type:'js',    recursive:false,  cb:require             },
    { path:'./relative-path2', type:'js',    recursive:false,  cb:require             },
    { path:'./relative-path3', type:'js',    recursive:true,   cb:customModuleInclude },
    { path:'./views',          type:'html',  recursive:true,   cb:YourViewsModule.add }
])
```

## How To Run The Tests

```
$ git clone http://github.com/rm-rf-etc/filefetcher.git
$ cd filefetcher
$ npm install expect.js
$ npm install -g mocha
$ mocha
```
