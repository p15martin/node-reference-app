define(
    [ "database", "rpcServer" ],
    function( database, rpcServer ) {
        function connectToDatabase( mongoUri ) {
            database.connectToDatabase( mongoUri, function( error ) {
                if( error ) {
                    throw new ApplicationError( "Failed to connect to database " + mongoUri );                
                } else {
                    console.log( "Successfully connected to database: " + mongoUri );
                }
            });
        }

        function startRpcServer( rpcServerPort ) {
            rpcServer.startServer( rpcServerPort, function( error ) {
                if( error ) {
                    throw new ApplicationError( "Failed to start RPC server on port " + rpcServerPort );                
                } else {
                    console.log( "Successfully started RPC server on port: " + rpcServerPort );
                }
            });
        }

        function ApplicationError( message ) {
            Error.call( this );
            Error.captureStackTrace( this, this.constructor );

            this.name = this.constructor.name;
            this.message = message;

        }

        ApplicationError.prototype.__proto__ = Error.prototype;

        return {
            start: function( mongoUri, rpcServerPort ) {
                connectToDatabase( mongoUri );

                startRpcServer( rpcServerPort );
            }
        }
    }
);