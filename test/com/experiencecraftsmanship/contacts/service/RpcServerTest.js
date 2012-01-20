var requirejs = require( "requirejs" );
requirejs.config( require( process.env.PWD + "/config" ) );

requirejs(
    [ "buster", "rpcServer", "connect" ],
    function( buster, rpcServer, connect ) {
        buster.testCase("Test create RPC server", {
            setUp: function () {
                this.rpcPort = 1234;
                this.server = { listen: function() {} };

                this.callback = this.spy();
            },
            "success": function () {
                this.server.listen = this.stub( this.server, "listen" ).yields( null );

                this.stub( connect, "createServer" ).returns( this.server );

                rpcServer.startServer( this.rpcPort, this.callback );

                assert.calledOnce( this.callback );
   	        },
            "fail": function () {
                var error = new Error();
                
                this.server.listen = this.stub( this.server, "listen" ).yields( error );

                this.stub( connect, "createServer" ).returns( this.server );

                rpcServer.startServer( this.rpcPort, this.callback );

                assert.calledOnceWith( this.callback, error );
    	    }
        });
    }
);