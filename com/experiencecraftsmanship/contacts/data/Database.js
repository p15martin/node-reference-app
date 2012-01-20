define(
    [ "mongoose" ],
    function( mongoose ) {
        return {
            connectToDatabase: function( mongoUri, callback ) {
                console.log( "Connecting to database: " + mongoUri );

                mongoose.connect( mongoUri, callback );
            }
        }
    }
);
