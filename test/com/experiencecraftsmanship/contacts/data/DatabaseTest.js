var requirejs = require( "requirejs" );
requirejs.config( require( process.env.PWD + "/config" ) );

requirejs(
    [ "buster", "database", "mongoose" ],
    function( buster, database, mongoose ) {
        buster.testCase("Test database connect", {
            setUp: function () {
                this.mongoUri = "http://experiencecraftsmanship.com/db";
            },
            "success": function () {
                var mongooseMock = this.mock( mongoose ).expects( "connect" ).once().withArgs( this.mongoUri ).yields( null );

                var callback = this.spy();

                database.connectToDatabase( this.mongoUri, callback );

                assert.calledOnce( callback );
    	        assert( mongooseMock.verify() );
   	        },
            "fail": function () {
                var error = new Error();
                var mongooseMock = this.mock( mongoose ).expects( "connect" ).once().withArgs( this.mongoUri ).yields( error );

                var callback = this.spy();

                database.connectToDatabase( this.mongoUri, callback );

                assert.calledOnceWith( callback, error );
                assert( mongooseMock.verify() );
    	    }
        });
    }
);