define(
    [ "contactDao" ],
    function( contactDao ) {
        return {
            addContact: function( firstName, lastName, cellNumber, callback ) {
                console.log( "ContactService.addContact( " + firstName + ", " + lastName + ", " + cellNumber + " )" );

                contactDao.addContact( firstName, lastName, cellNumber, callback );
            },
            findAllContactsByLastName: function( lastName, callback ) {
                console.log( "ContactService.findAllContactsByLastName( " + lastName + " )" );

                contactDao.findAllContactsByLastName( lastName, callback );
            },
            updateCellNumber: function( id, cellNumber, callback ) {
                console.log( "ContactService.updateCellNumber( " + id + ", " + cellNumber + " )" );
                
                contactDao.updateCellNumber( id, cellNumber, callback );
            },
            deleteContact: function( id, callback ) {
                console.log( "ContactService.findAllContactsByLastName( " + id + " )" );
                
                contactDao.deleteContact( id, callback );
            }
        }
    }
);