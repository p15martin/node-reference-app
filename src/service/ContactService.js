define(
    [ "node-uuid", "contactDao" ],
    function( uuid, contactDao ) {
        return {
            addContact: function( firstName, lastName, cellNumber, callback ) {
                var start = Date.now();
                var logid = uuid.v4();

                console.log( "Service called to create new contact for firstName='%s', 'lastName='%s', cellNumber='%d' [UUID: %s]", firstName, lastName, cellNumber, logid );

                contactDao.addContact( firstName, lastName, cellNumber, logid, function( error, result ) {
                    if ( callback ) {
                        callback( error, result );
                    }

                    console.log( "Service call completed to create new contact for firstName='%s', 'lastName='%s', cellNumber='%d' [%dms][UUID: %s]", firstName, lastName, cellNumber, Date.now()-start, logid );
                });
            },
            findAllContactsByLastName: function( lastName, callback ) {
                var start = Date.now();
                var logid = uuid.v4();

                console.log( "Service called to find all contacts with lastName '%s' [UUID: %s]", lastName, logid );

                contactDao.findAllContactsByLastName( lastName, logid, function( error, result ) {
                    if ( callback ) {
                        callback( error, result );
                    }

                    console.log( "Service call completed to find all contacts with lastName '%s' [%dms][UUID: %s]", lastName, Date.now()-start, logid );
                });
            },
            updateCellNumber: function( id, cellNumber, callback ) {
                var start = Date.now();
                var logid = uuid.v4();

                console.log( "Service called to update the cell number to '%s', for the contact with id '%s' [UUID: %s]", cellNumber, id, logid );
                
                contactDao.updateCellNumber( id, cellNumber, logid, function( error, result ) {
                    if ( callback ) {
                        callback( error, result );
                    }

                    console.log( "Service call completed to update the cell number to '%s', for the contact with id '%s' [%dms][UUID: %s]", cellNumber, id, Date.now()-start, logid );
                });
            },
            deleteContact: function( id, callback ) {
                var start = Date.now();
                var logid = uuid.v4();

                console.log( "Service called to delete contact with id '%s [UUID: %s]'", id, logid );
                
                contactDao.deleteContact( id, logid, function( error, result ) {
                    if ( callback ) {
                        callback( error, result );
                    }

                    console.log( "Service call completed to delete contact with id '%s' [%dms][UUID: %s]", id, Date.now()-start, logid );
                });
            }
        }
    }
);