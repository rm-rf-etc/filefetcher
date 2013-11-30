
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
            __dirname+'/1/1.js',
            __dirname+'/2/a.js',
            __dirname+'/2/b.js',
            __dirname+'/2/c.js',
            __dirname+'/3/z.js',
            __dirname+'/3/extra/extra.js'
        ]

        expect( results ).to.eql( expected_output )
        console.log( '\n', results )
    })
    it('throws error without input',function(){
        expect(function(){
            filefetcher()
        }).to.throwError(function(e){
            expect(e.message).to.be('filefetcher() called without parameters.')
        })
    })
    it('throws input error for non-array argument',function(){

        expect(function(){
            filefetcher(function(){})
        }).to.throwError(function(e){
            expect(e.message).to.contain('filefetcher() only accepts an array of objects, but received:')
        })

        expect(function(){
            filefetcher({})
        }).to.throwError(function(e){
            expect(e.message).to.contain('filefetcher() only accepts an array of objects, but received:')
        })

        expect(function(){
            filefetcher(1)
        }).to.throwError(function(e){
            expect(e.message).to.contain('filefetcher() only accepts an array of objects, but received:')
        })

        expect(function(){
            filefetcher('-')
        }).to.throwError(function(e){
            expect(e.message).to.contain('filefetcher() only accepts an array of objects, but received:')
        })
    })
    it('throws error upon invalid ruleset',function(){
        
        expect(function(){
            filefetcher([{ path:__dirname+'/1', tpe:'js', recursive:false, cb:function(){} }])
        }).to.throwError(function(e){
            expect(e.message).to.contain('filefetcher() received invalid rule set:')
        })

        expect(function(){
            filefetcher([{ pth:__dirname+'/1', type:'js', recursive:false, cb:function(){} }])
        }).to.throwError(function(e){
            expect(e.message).to.contain('filefetcher() received invalid rule set:')
        })

        expect(function(){
            filefetcher([{ path:__dirname+'/1', type:'js', rve:false, cb:function(){} }])
        }).to.throwError(function(e){
            expect(e.message).to.contain('filefetcher() received invalid rule set:')
        })

        expect(function(){
            filefetcher([{ path:__dirname+'/1', type:'js', recursive:false, c:function(){} }])
        }).to.throwError(function(e){
            expect(e.message).to.contain('filefetcher() received invalid rule set:')
        })
    })
})
