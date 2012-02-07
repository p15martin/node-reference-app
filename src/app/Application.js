define(
    [ "async", "database", "rpcServer" ],
    function( async, database, rpcServer ) {
        function startServices( mongoUri, rpcServerPort ) {
            var start = Date.now();

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

        function connectToDatabase( mongoUri, callback ) {
            database.connectToDatabase( mongoUri, callback );
        }

        function startRpcServer( rpcServerPort, callback ) {
            rpcServer.startServer( rpcServerPort, callback );
        }
         
        function addProcessHandlers() {
            process.on( "SIGTERM", function () { 
                console.log( "Got SIGTERM" );
                process.exit(0);
            });

            process.on( "SIGINT", function () { 
                console.log( "Got SIGINT" );
                process.exit(0);
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
                console.log( "Starting application..." );

                addProcessHandlers();
                startServices( mongoUri, rpcServerPort );                
            }
        }
    }
);