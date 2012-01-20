var requirejs = require( "requirejs" );
requirejs.config( require( "./config" ) );

requirejs(
    [ "app" ],
    function( app ) {
        var mongoUri = process.env.MONGOLAB_URI;
        var rpcServerPort = process.env.PORT || 3000;

        app.start( mongoUri, rpcServerPort );
    }
);