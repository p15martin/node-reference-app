var requirejs = require( "requirejs" );
requirejs.config( require( process.env.PWD + "/config" ) );

requirejs(
    [ "buster", "ContactModel" ],
    function( buster, ContactModel ) {
        buster.testCase("Test the contact model", {
            setUp: function() {
                this.firstName = "Peter";
                this.lastName = "Martin";
                this.cellNumber = 123678924;
            },
            "new instance": function () {
                assert.isObject( ContactModel.newInstance() );
   	        },
            "properties": function() {
                var contact = ContactModel.newInstance();

                contact.firstName = this.firstName;
                contact.lastName = this.lastName;
                contact.cellNumber = this.cellNumber;

                assert.equals( contact.firstName, this.firstName );
                assert.equals( contact.lastName, this.lastName );
                assert.equals( contact.cellNumber, this.cellNumber );
            }
        });
    }
);