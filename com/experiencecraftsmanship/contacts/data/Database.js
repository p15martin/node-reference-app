define(
    [ "mongoose" ],
    function( mongoose ) {
        return {
            connectToDatabase: function( mongoUri, callback ) {
                console.log( "Connecting to database '%s'...", mongoUri );

                mongoose.connect( mongoUri, function( error ) {
                	if ( error ) {
                		console.error( "Error connecting to database '%s'", mongoUri );
                	} else {
                		console.info( "Successfully connected to database '%s'", mongoUri );
                	}

                	callback( error );
                });
            }
        }
    }
);
