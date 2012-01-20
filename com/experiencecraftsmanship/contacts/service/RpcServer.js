define(
    [ "connect", "contactService" ],
    function( connect, contactService ) {
    	return {
            startServer: function( rpcServerPort, callback ) {
            	console.log( "Starting RPC server on port: " + rpcServerPort );

            	connect.createServer(
            		connect.responseTime(),
            		require('connect-jsonrpc')( contactService )
        		).listen( rpcServerPort, callback );
            }
        }
    }
);
