define(
    [ "node-uuid", "contactDao" ],
    function( uuid, contactDao ) {
        return {
            addContact: function( firstName, lastName, cellNumber, callback ) {
                var start = Date.now();
                var logid = uuid.v4();

                console.log( "Service called to create new contact for firstName='%s', 'lastName='%s', cellNumber='%d' [UUID: %s]", firstName, lastName, cellNumber, logid );

                contactDao.addContact( firstName, lastName, cellNumber, function( error, result ) {
                    if ( callback ) {
                        callback( error, result );
                    }

                    console.log( "Service call completed to create new contact for firstName='%s', 'lastName='%s', cellNumber='%d' [UUID: %s][%dms]", firstName, lastName, cellNumber, logid, Date.now()-start );
                });
            },
            findAllContactsByLastName: function( lastName, callback ) {
                var start = Date.now();
                var logid = uuid.v4();

                console.log( "Service called to find all contacts with lastName '%s'", lastName );

                contactDao.findAllContactsByLastName( lastName, function( error, result ) {
                    if ( callback ) {
                        callback( error, result );
                    }

                    console.log( "Service call completed to find all contacts with lastName '%s' [UUID: %s][%dms]", lastName, logid, Date.now()-start );
                });
            },
            updateCellNumber: function( id, cellNumber, callback ) {
                var start = Date.now();
                var logid = uuid.v4();

                console.log( "Service called to update the cell number to '%s', for the contact with id '%s' [UUID: %s]", cellNumber, id, logid );
                
                contactDao.updateCellNumber( id, cellNumber, function( error, result ) {
                    if ( callback ) {
                        callback( error, result );
                    }

                    console.log( "Service call completed to update the cell number to '%s', for the contact with id '%s' [UUID: %s][%dms]", cellNumber, id, logid, Date.now()-start );
                });
            },
            deleteContact: function( id, callback ) {
                var start = Date.now();
                var logid = uuid.v4();

                console.log( "Service called to delete contact with id '%s [UUID: %s]'", id, logid );
                
                contactDao.deleteContact( id, function( error, result ) {
                    if ( callback ) {
                        callback( error, result );
                    }

                    console.log( "Service call completed to delete contact with id '%s' [UUID: %s][%dms]", id, logid, Date.now()-start );
                });
            }
        }
    }
);