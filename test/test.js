
var filefetcher = require('../filefetcher')
var expect = require('expect.js')


describe('filefetcher',function(){
    it('finds files in directories in test/',function(){
        var results = []
        function store (file) { results.push(file) }

        filefetcher([
            { path:__dirname+'/1', type:'js', recursive:false, cb:store },
            { path:__dirname+'/2', type:'js', recursive:false, cb:store },
            { path:__dirname+'/3', type:'js', recursive:true,  cb:store }
        ])

        var expected_output = [
            '/Users/robchristian/www/npm published/filefetcher/test/1/1.js',
            '/Users/robchristian/www/npm published/filefetcher/test/2/a.js',
            '/Users/robchristian/www/npm published/filefetcher/test/2/b.js',
            '/Users/robchristian/www/npm published/filefetcher/test/2/c.js',
            '/Users/robchristian/www/npm published/filefetcher/test/3/z.js',
            '/Users/robchristian/www/npm published/filefetcher/test/3/extra/extra.js'
        ]

        expect( results ).to.eql( expected_output )
        console.log( '\n', results )
    })
})
