define(
    [ "ContactModel" ],
    function( ContactModel ) {
        return {
            addContact: function( firstName, lastName, cellNumber, logid, callback ) {
                var start = Date.now();

                console.log( "Creating a new contact in the database for firstName='%s', 'lastName='%s', cellNumber='%d' [UUID: %s]", firstName, lastName, cellNumber, logid );

                var contact = ContactModel.newInstance();
                contact.firstName = firstName;
                contact.lastName = lastName;
                contact.cellNumber = cellNumber;
                contact.save( function( error, result ) {
                    if ( error ) {
                        console.error( "Error creating the new contact (firstName='%s', 'lastName='%s', cellNumber='%d') in the database: %s [UUID: %s]", firstName, lastName, cellNumber, error.message, logid );

                        if ( callback ) {
                            callback( error );
                        }
                    } else {
                        var id = result._id;

                        console.log( "Successfully created the new contact (firstName='%s', 'lastName='%s', cellNumber='%d') in the database with id '%s' [%dms][UUID: %s]", firstName, lastName, cellNumber, id, Date.now()-start, logid );

                        if ( callback ) {
                            callback( null, { id: id } );
                        }
                    }
                });
            },
            findAllContactsByLastName: function( lastName, logid, callback ) {
                var start = Date.now();

                console.log( "Finding all contacts in the database with lastName '%s' [UUID: %s]", lastName, logid );

                ContactModel.find( { "lastName": lastName }, function ( error, result ) {
                    if ( error ) {
                        console.error( "Error finding all contacts with lastName '%s' [UUID: %s]", lastName, logid );

                        if ( callback ) {
                            callback( error );
                        }
                    } else {
                        console.log( "Successfully found '%d' contacts in the database with lastName '%s' [%dms][UUID: %s]", result.length, lastName, Date.now()-start, logid );

                        if ( callback ) {
                            callback( null, result );
                        }
                    }
                });
            },
            updateCellNumber: function( id, cellNumber, logid, callback ) {
                var start = Date.now();

                console.log( "Updating cell number to '%s', for contact in database with id '%s' [UUID: %s]", cellNumber, id, logid );

                ContactModel.update( { "_id": id }, { 'cellNumber': cellNumber }, function( error, result ) {
                    if ( error ) {
                        console.error( "Error updating cell number to '%s', for contact in database with id '%s' [UUID: %s]", cellNumber, id, logid );

                        if ( callback ) {
                            callback( error );
                        }
                    } else {
                        console.log( "Successfully updated the cell number to '%s', for '%d' contact(s) in the database with id '%s' [%dms][UUID: %s]", cellNumber, result, id, Date.now()-start, logid );

                        if ( callback ) {
                            callback( null, { count: result } );
                        }
                    }
                });
            },
            deleteContact: function( id, logid, callback ) {
                var start = Date.now();

                console.log( "Deleting contact from database with id '%s' [UUID: %s]", id, logid );

                ContactModel.remove( { "_id": id }, function( error, result ) {
                    if ( error ) {
                        console.error( "Error deleting contact from database with id '%s' [UUID: %s]", id, logid );

                        if ( callback ) {
                            callback( error );
                        }
                    } else {
                        console.log( "Successfully deleted '%d' contact(s) from the database with id '%s' [%dms][UUID: %s]", result, id, Date.now()-start, logid );

                        if ( callback ) {
                            callback( null, { count: result } );
                        }
                    }
                });
            }
        }
    }
);