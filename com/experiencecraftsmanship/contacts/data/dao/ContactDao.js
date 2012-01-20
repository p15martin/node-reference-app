define(
    [ "ContactModel" ],
    function( ContactModel ) {
        return {
            addContact: function( firstName, lastName, cellNumber, callback ) {
                console.log( "ContactDao.addContact( " + firstName + ", " + lastName + ", " + cellNumber + " )" );

                var contact = ContactModel.newInstance();
                contact.firstName = firstName;
                contact.lastName = lastName;
                contact.cellNumber = cellNumber;
                contact.save( callback );
            },
            findAllContactsByLastName: function( lastName, callback ) {
                console.log( "ContactDao.findAllContactsByLastName( " + lastName + " )" );

                ContactModel.find( { "lastName": lastName }, callback );
            },
            updateCellNumber: function( id, cellNumber, callback ) {
                console.log( "ContactDao.updateCellNumber( " + id + ", " + cellNumber + " )" );

                ContactModel.update( { "_id": id }, { 'cellNumber': cellNumber }, callback );
            },
            deleteContact: function( id, callback ) {
                console.log( "ContactDao.findAllContactsByLastName( " + id + " )" );

                ContactModel.remove( { "_id": id }, callback );
            }
        }
    }
);