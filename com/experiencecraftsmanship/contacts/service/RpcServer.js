define(
    [ "connect", "contactService" ],
    function( connect, contactService ) {
    	return {
            startServer: function( rpcServerPort, callback ) {
            	console.log( "Starting RPC server on port: " + rpcServerPort );

            	connect.createServer(
            		connect.responseTime(),
            		require('connect-jsonrpc')( contactService )
        		).listen( rpcServerPort, function( error ) {
                    if ( error ) {
                        console.log( "Error starting RPC server on port: " + rpcServerPort );
                    } else {
                        console.log( "Successfully started RPC server on port: " + rpcServerPort );
                    }

                    callback( error );
                });
            }
        }
    }
);
