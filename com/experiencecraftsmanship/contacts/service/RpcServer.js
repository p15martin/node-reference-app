define(
    [ "connect", "contactService" ],
    function( connect, contactService ) {
    	return {
            startServer: function( rpcServerPort, callback ) {
            	console.log( "Starting RPC server on port: %d...", rpcServerPort );

            	connect.createServer(
            		connect.responseTime(),
            		require('connect-jsonrpc')( contactService )
        		).listen( rpcServerPort, function( error ) {
                    if ( error ) {
                        console.error( "Error starting RPC server on port: %d", rpcServerPort );
                    } else {
                        console.info( "Successfully started RPC server on port: %d", rpcServerPort );
                    }

                    callback( error );
                });
            }
        }
    }
);
