var requirejs = require( "requirejs" );
requirejs.config( require( process.env.PWD + "/config" ) );

requirejs(
    [ "buster", "app", "database", "rpcServer" ],
    function( buster, app, database, rpcServer ) {
        buster.testCase("Test application start", {
            setUp: function () {
                this.mongoUri = "http://experiencecraftsmanship.com/db";
                this.rpcPort = 1234;
            },
            "successful": function () {
                var databaseMock = this.mock( database ).expects( "connectToDatabase" ).once().withArgs( this.mongoUri ).yields( null );
                var rpcServerMock = this.mock( rpcServer ).expects( "startServer" ).once().withArgs( this.rpcPort ).yields( null );

                app.start( this.mongoUri, this.rpcPort );

    	        assert( databaseMock.verify() );
                assert( rpcServerMock.verify() );
    	    },
            "throws an error if the database connection fails": function() {
                var appSpy = this.spy( app, "start" );

                this.stub( database, "connectToDatabase" ).yields( new Error() );

                try {
                    app.start( this.mongoUri, this.rpcPort );    
                } catch ( error ) {}

                assert( appSpy.threw() );
            },
            "throws an error if the RPC servers fails to start": function() {
                var databaseMock = this.mock( database ).expects( "connectToDatabase" ).once().withArgs( this.mongoUri ).yields( null );

                var appSpy = this.spy( app, "start" );

                this.stub( rpcServer, "startServer" ).yields( new Error() );

                try {
                    app.start( this.mongoUri, this.rpcPort );    
                } catch ( error ) {}

                assert( appSpy.threw() );
            }
        });
    }
);