var requirejs = require( "requirejs" );
requirejs.config( require( process.env.PWD + "/config" ) );

requirejs(
    [ "buster", "contactService", "contactDao" ],
    function( buster, contactService, contactDao ) {
        buster.testCase("Test create contact", {
            setUp: function() {
                this.firstName = "Peter";
                this.lastName = "Martin";
                this.cellNumber = 123678924;
                this.id = "4f08f1b04bcd790100000002";
                this.result = { id: this.id };

                this.callback = this.spy();
                this.error = new Error();
            },
            "successfully": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "addContact" ).once().yields( null, this.result );

                contactService.addContact( this.firstName, this.lastName, this.cellNumber, this.callback );

                assert.calledOnceWith( this.callback, null, { id: this.id } );
                assert( contactDaoMock.verify() );
            },
            "without callback": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "addContact" ).once().yields( null, this.result );

                contactService.addContact( this.firstName, this.lastName, this.cellNumber );

                assert( contactDaoMock.verify() );
            },
            "with an error": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "addContact" ).once().yields( this.error );

                contactService.addContact( this.lastName, this.callback );

                assert.calledOnceWith( this.callback, this.error );
                assert( contactDaoMock.verify() );
            }
            ,
            "with an error and no callback": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "addContact" ).once().yields( this.error );

                contactService.addContact( this.lastName);

                assert( contactDaoMock.verify() );
            }
        }),
        buster.testCase("Test find all contacts by last name", {
            setUp: function() {
                this.lastName = "Martin";
                this.result = [ {}, {}, {} ];

                this.callback = this.spy();
                this.error = new Error();
            },
            "successfully": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "findAllContactsByLastName" ).once().yields( null, this.result );

                contactService.findAllContactsByLastName( this.lastName, this.callback );

                assert.calledOnceWith( this.callback, null, this.result );
                assert( contactDaoMock.verify() );
   	        },
            "without callback": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "findAllContactsByLastName" ).once().yields( null, this.result );

                contactService.findAllContactsByLastName( this.lastName );

                assert( contactDaoMock.verify() );
            },
            "with an error": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "findAllContactsByLastName" ).once().yields( this.error );

                contactService.findAllContactsByLastName( this.lastName, this.callback );

                assert.calledOnceWith( this.callback, this.error );
                assert( contactDaoMock.verify() );
            },
            "with an error and no callback": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "findAllContactsByLastName" ).once().yields( this.error );

                contactService.findAllContactsByLastName( this.lastName );

                assert( contactDaoMock.verify() );
            }
        }),
        buster.testCase("Test update contact cell number", {
            setUp: function() {
                this.cellNumber = 123678924;
                this.id = "4f08f1b04bcd790100000002";
                this.result = { count: 1 };

                this.callback = this.spy();
                this.error = new Error();
            },
            "successfully": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "updateCellNumber" ).once().yields( null, this.result );

                contactService.updateCellNumber( this.id, this.cellNumber, this.callback );

                assert.calledOnceWith( this.callback, null, this.result );
                assert( contactDaoMock.verify() );
            },
            "without callback": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "updateCellNumber" ).once().yields( null, this.result );

                contactService.updateCellNumber( this.id, this.cellNumber );

                assert( contactDaoMock.verify() );
            },
            "with an error": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "updateCellNumber" ).once().yields( this.error );

                contactService.updateCellNumber( this.id, this.cellNumber, this.callback );

                assert.calledOnceWith( this.callback, this.error );
                assert( contactDaoMock.verify() );
            }
            ,
            "with an error and no callback": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "updateCellNumber" ).once().yields( this.error );

                contactService.updateCellNumber( this.id, this.cellNumber );

                assert( contactDaoMock.verify() );
            }
        }),
        buster.testCase("Test delete contact", {
            setUp: function() {
                this.id = "4f08f1b04bcd790100000002";
                this.result = { count: 1 };

                this.callback = this.spy();
                this.error = new Error();
            },
            "successfully": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "deleteContact" ).once().yields( null, this.result );

                contactService.deleteContact( this.id, this.callback );

                assert.calledOnceWith( this.callback, null, this.result );
                assert( contactDaoMock.verify() );
            },
            "without callback": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "deleteContact" ).once().yields( null, this.result );

                contactService.deleteContact( this.id );

                assert( contactDaoMock.verify() );
            },
            "with an error": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "deleteContact" ).once().yields( this.error );

                contactService.deleteContact( this.id, this.callback );

                assert.calledOnceWith( this.callback, this.error );
                assert( contactDaoMock.verify() );
            }
            ,
            "with an error and no callback": function () {
                var contactDaoMock = this.mock( contactDao ).expects( "deleteContact" ).once().yields( this.error );

                contactService.deleteContact( this.id );

                assert( contactDaoMock.verify() );
            }
        });
    }
);