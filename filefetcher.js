
var fs = require('fs')
var pth = require('path')
var util = require('util')
var filesHereSync = fs.readdirSync
var formPath = pth.join
var fullPath = pth.resolve
function isFile_S (path) { return fs.lstatSync( path ).isFile() }
function isFolder_S (path) { return fs.lstatSync( path ).isDirectory() }

module.exports = function filefetcher (criteria) {

    if (!criteria)
        throw new Error('filefetcher() called without parameters.')
    if (Object.prototype.toString.apply(criteria) !== '[object Array]')
        throw new Error('filefetcher() only accepts an array of objects, but received: '+criteria+'.')

    for (var e in criteria) {
        var o = criteria[e]
        if (!o.hasOwnProperty('path') || !o.hasOwnProperty('recursive') || !o.hasOwnProperty('type') || !o.hasOwnProperty('cb'))
            throw new Error("filefetcher() received invalid rule set:\n"+util.inspect(o))
        if (isFolder_S(o.path))
            findMeMaybe(o.path, o.recursive, o.type, o.cb)
    }

    function findMeMaybe (path, recursive, ext, cb) {
        var type = new RegExp('[.]'+ext+'$')
        var files_here = filesHereSync(path)
        var more_folders = []
        var more_paths = []


        for (var i in files_here) {
            var new_file = files_here[i]

            if (new_file[0] !== '.') {
                var new_file = formPath(path, files_here[i])

                if ( isFile_S(new_file) && type.test(new_file) ) {

                    if ( typeof cb === 'function' )
                        cb( fullPath(new_file) )
                }

                if (recursive)
                    if (isFolder_S(new_file)) more_folders.push(new_file)
            }
        }
        for (var i in more_folders) // more_folders is empty if recursive is false
            findMeMaybe(more_folders[i], recursive, ext, cb)
    }
}
