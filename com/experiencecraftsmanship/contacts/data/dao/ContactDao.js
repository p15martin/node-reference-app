define(
    [ "ContactModel" ],
    function( ContactModel ) {
        return {
            addContact: function( firstName, lastName, cellNumber, callback ) {
                console.log( "Creating a new contact in the database: firstName='%s', 'lastName='%s', cellNumber='%d'", firstName, lastName, cellNumber );

                var contact = ContactModel.newInstance();
                contact.firstName = firstName;
                contact.lastName = lastName;
                contact.cellNumber = cellNumber;
                contact.save( function( error, result ) {
                    if ( error ) {
                        console.error( "Error creating the new contact (firstName='%s', 'lastName='%s', cellNumber='%d') in the database: %s", firstName, lastName, cellNumber, error.message );

                        if ( callback ) {
                            callback( error );
                        }
                    } else {
                        var id = result._id;

                        console.log( "Successfully created the new contact (firstName='%s', 'lastName='%s', cellNumber='%d') in the database with id '%s'", firstName, lastName, cellNumber, id );

                        if ( callback ) {
                            callback( null, { _id: id } );
                        }
                    }
                });
            },
            findAllContactsByLastName: function( lastName, callback ) {
                console.log( "Finding all contacts in the database with lastName '%s'", lastName );

                ContactModel.find( { "lastName": lastName }, function ( error, result ) {
                    if ( error ) {
                        console.error( "Error finding all contacts with lastName '%s'", lastName );

                        if ( callback ) {
                            callback( error );
                        }
                    } else {
                        console.log( "Successfully found '%d' contacts in the database with lastName '%s'", result.length, lastName );

                        if ( callback ) {
                            callback( null, result );
                        }
                    }
                });
            },
            updateCellNumber: function( id, cellNumber, callback ) {
                console.log( "Updating cell number '%s' for contact in database with id '%s'", cellNumber, id );

                ContactModel.update( { "_id": id }, { 'cellNumber': cellNumber }, function( error, result ) {
                    if ( error ) {
                        console.error( "Error updating cell number '%s' for contact in database with id '%s'", cellNumber, id );

                        if ( callback ) {
                            callback( error );
                        }
                    } else {
                        console.log( "Successfully updated '%d' contact(s) in the database with cell number '%s' and id '%s'", result, cellNumber, id );

                        if ( callback ) {
                            callback( null, { count: result } );
                        }
                    }
                });
            },
            deleteContact: function( id, callback ) {
                console.log( "Deleting contact from database with id '%s'", id );

                ContactModel.remove( { "_id": id }, function( error, result ) {
                    if ( error ) {
                        console.error( "Error deleting contact from database with id '%s'", id );

                        if ( callback ) {
                            callback( error );
                        }
                    } else {
                        console.log( "Successfully deleted '%d' contact(s) from the database with id '%s'", result, id );

                        if ( callback ) {
                            callback( null, { count: result } );
                        }
                    }
                });
            }
        }
    }
);