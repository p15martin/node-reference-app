define(
    [ "ContactModel" ],
    function( ContactModel ) {
        return {
            addContact: function( firstName, lastName, cellNumber, callback ) {
                console.log( "Creating a new contact: firstName='%s', 'lastName='%s', cellNumber='%d'", firstName, lastName, cellNumber );

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

                        console.log( "Successfully created the new contact (firstName='%s', 'lastName='%s', cellNumber='%d') in the databasewith id '%s'", firstName, lastName, cellNumber, id );

                        if ( callback ) {
                            callback( null, id );
                        }
                    }
                });
            },
            findAllContactsByLastName: function( lastName, callback ) {
                console.log( "Finding all contacts with lastName '%s'", lastName );

                ContactModel.find( { "lastName": lastName }, function ( error, result ) {
                    if ( error ) {
                        console.error( "Error finding all contacts with lastName '%s'", lastName );

                        if ( callback ) {
                            callback( error );
                        }
                    } else {
                        console.log( "Successfully found all contacts with lastName '%s'", lastName );

                        console.log( "************ RESULT " + result );

                        if ( callback ) {
                            callback( null, result );
                        }
                    }
                });
            },
            updateCellNumber: function( id, cellNumber, callback ) {
                console.log( "Updating contact with id '%s' with new cell number '%s'", id, cellNumber );

                ContactModel.update( { "_id": id }, { 'cellNumber': cellNumber }, callback );
            },
            deleteContact: function( id, callback ) {
                console.log( "Deleting contact with id '%s'", id );

                ContactModel.remove( { "_id": id }, callback );
            }
        }
    }
);