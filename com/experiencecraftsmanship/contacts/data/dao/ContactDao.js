define(
    [ "ContactModel" ],
    function( ContactModel ) {
        return {
            addContact: function( firstName, lastName, cellNumber, callback ) {
                console.log( "Creating a new contact in the databse: firstName='%s', 'lastName='%s', cellNumber='%d'", firstName, lastName, cellNumber );

                var contact = ContactModel.newInstance();
                contact.firstName = firstName;
                contact.lastName = lastName;
                contact.cellNumber = cellNumber;
                contact.save( callback );
            },
            findAllContactsByLastName: function( lastName, callback ) {
                console.log( "Finding all contacts in the database with lastName: %s", lastName );

                ContactModel.find( { "lastName": lastName }, callback );
            },
            updateCellNumber: function( id, cellNumber, callback ) {
                console.log( "Updating contact with id '%s' with new cell number: %s", id, cellNumber );

                ContactModel.update( { "_id": id }, { 'cellNumber': cellNumber }, callback );
            },
            deleteContact: function( id, callback ) {
                console.log( "Deleting contact with id '%s'", id );

                ContactModel.remove( { "_id": id }, callback );
            }
        }
    }
);