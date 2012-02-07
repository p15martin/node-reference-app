define(
    [ "connect", "contactService" ],
    function( connect, contactService ) {
    	return {
            startServer: function( rpcServerPort, callback ) {
                var start = Date.now();

            	console.log( "Starting RPC server on port '%d'...", rpcServerPort );

            	connect.createServer(
            		connect.responseTime(),
            		require('connect-jsonrpc')( contactService )
        		).listen( rpcServerPort, function( error ) {
                    if ( error ) {
                        console.error( "Error starting RPC server on port '%d'", rpcServerPort );
                    } else {
                        console.info( "Successfully started RPC server on port '%d' [%dms]", rpcServerPort, Date.now()-start );
                    }

                    if ( callback ) {
                        callback( error );   
                    }
                });
            }
        }
    }
);
