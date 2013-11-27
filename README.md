
Filefetcher.js
==============

A node.js utility for automatically loading project files.

## Description

Finds files having a specified extension, and passes the full path to the file as the
argument to the callback that you provide. Also runs recursively if recursive is true.
This allows automated loading of project files according to your own rules.

## Usage

```js
var filefetcher = require('filefetcher')

var results = []
function store (file) { results.push(file) }

filefetcher([
    { path:__dirname+'/1', type:'js', recursive:false, cb:store },
    { path:__dirname+'/2', type:'js', recursive:false, cb:store },
    { path:__dirname+'/3', type:'js', recursive:true,  cb:store }
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
