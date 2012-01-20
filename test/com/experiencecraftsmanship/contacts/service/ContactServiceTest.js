var requirejs = require( "requirejs" );
requirejs.config( require( process.env.PWD + "/config" ) );

requirejs(
    [ "buster", "contactService", "contactDao" ],
    function( buster, contactService, contactDao ) {
        buster.testCase("Test contact service", {
            setUp: function() {
                this.firstName = "Peter";
                this.lastName = "Martin";
                this.cellNumber = 123678924;
                this.id = "4f08f1b04bcd790100000002";

                this.callback = this.spy();
                this.error = new Error();
            },
            "add a new contact": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "addContact" ).once().yields( "{}" );

                contactService.addContact( this.lastName, this.callback );

                assert.calledOnce( this.callback );
                assert( contactDaoMock.verify() );
            },
            "add a new contact error": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "addContact" ).once().yields( this.error );

                contactService.addContact( this.lastName, this.callback );

                assert.calledOnceWith( this.callback, this.error );
                assert( contactDaoMock.verify() );
            },
            "find all contacts by last name": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "findAllContactsByLastName" ).once().yields( "{}" );

                contactService.findAllContactsByLastName( this.lastName, this.callback );

                assert.calledOnce( this.callback );
                assert( contactDaoMock.verify() );
   	        },
            "find all contacts by last name error": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "findAllContactsByLastName" ).once().yields( this.error );

                contactService.findAllContactsByLastName( this.lastName, this.callback );

                assert.calledOnceWith( this.callback, this.error );
                assert( contactDaoMock.verify() );
            },
            "update cell number": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "updateCellNumber" ).once().yields( "{}" );

                contactService.updateCellNumber( this.id, this.cellNumber, this.callback );

                assert.calledOnce( this.callback );
                assert( contactDaoMock.verify() );
            },
            "update cell number error": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "updateCellNumber" ).once().yields( this.error );

                contactService.updateCellNumber( this.id, this.cellNumber, this.callback );

                assert.calledOnceWith( this.callback, this.error );
                assert( contactDaoMock.verify() );
            }
            ,
            "delete contact": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "deleteContact" ).once().yields( "{}" );

                contactService.deleteContact( this.id, this.callback );

                assert.calledOnce( this.callback );
                assert( contactDaoMock.verify() );
            },
            "delete contact error": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "deleteContact" ).once().yields( this.error );

                contactService.deleteContact( this.id, this.callback );

                assert.calledOnceWith( this.callback, this.error );
                assert( contactDaoMock.verify() );
            }
        });
    }
);