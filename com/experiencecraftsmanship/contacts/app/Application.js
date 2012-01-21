define(
    [ "async", "database", "rpcServer" ],
    function( async, database, rpcServer ) {
        function connectToDatabase( mongoUri, callback ) {
            database.connectToDatabase( mongoUri, callback );
        }

        function startRpcServer( rpcServerPort, callback ) {
            rpcServer.startServer( rpcServerPort, callback );
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
                var start = Date.now();
                
                console.log( "Starting application..." );

                async.parallel([
                    function( callback ) { connectToDatabase( mongoUri, callback ) },
                    function( callback ) { startRpcServer( rpcServerPort, callback ) }
                ],
                function( error ) {
                    if ( error ) {
                        throw new ApplicationError( "Error starting application!" );
                    } else {
                        console.info( "Successfully started application [%dms]", Date.now()-start );
                    }
                });
            }
        }
    }
);