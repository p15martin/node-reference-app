define(
    [ "mongoose" ],
    function( mongoose ) {
        return {
            connectToDatabase: function( mongoUri, callback ) {
                console.log( "Connecting to database: " + mongoUri );

                mongoose.connect( mongoUri, function( error ) {
                	if ( error ) {
                		console.log( "Error connecting to database: " + mongoUri );
                	} else {
                		console.log( "Successfully connected to database: " + mongoUri );
                	}

                	callback( error );
                });
            }
        }
    }
);
