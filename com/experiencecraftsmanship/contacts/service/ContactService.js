define(
    [ "contactDao" ],
    function( contactDao ) {
        return {
            addContact: function( firstName, lastName, cellNumber, callback ) {
                var start = Date.now();

                console.log( "Service called to create new contact for firstName='%s', 'lastName='%s', cellNumber='%d'", firstName, lastName, cellNumber );

                contactDao.addContact( firstName, lastName, cellNumber, function( error, result ) {
                    if ( callback ) {
                        callback( error, result );
                    }

                    console.log( "Service call completed to create new contact for firstName='%s', 'lastName='%s', cellNumber='%d', in %dms", firstName, lastName, cellNumber, Date.now()-start );
                });
            },
            findAllContactsByLastName: function( lastName, callback ) {
                var start = Date.now();

                console.log( "Service called to find all contacts with lastName '%s'", lastName );

                contactDao.findAllContactsByLastName( lastName, function( error, result ) {
                    if ( callback ) {
                        callback( error, result );
                    }

                    console.log( "Service call completed to find all contacts with lastName '%s', in %dms", lastName, Date.now()-start );
                });
            },
            updateCellNumber: function( id, cellNumber, callback ) {
                var start = Date.now();

                console.log( "Service called to update the cell number to '%s', for the contact with id '%s'", cellNumber, id );
                
                contactDao.updateCellNumber( id, cellNumber, function( error, result ) {
                    if ( callback ) {
                        callback( error, result );
                    }

                    console.log( "Service call completed to update the cell number to '%s', for the contact with id '%s', in %dms", cellNumber, id, Date.now()-start );
                });
            },
            deleteContact: function( id, callback ) {
                var start = Date.now();

                console.log( "Service called to delete contact with id '%s'", id );
                
                contactDao.deleteContact( id, function( error, result ) {
                    if ( callback ) {
                        callback( error, result );
                    }

                    console.log( "Service call completed to delete contact with id '%s', in %dms", id, Date.now()-start );
                });
            }
        }
    }
);