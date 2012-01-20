var requirejs = require( "requirejs" );
requirejs.config( require( process.env.PWD + "/config" ) );

requirejs(
    [ "buster", "contactDao", "ContactModel" ],
    function( buster, contactDao, ContactModel ) {
        buster.testCase("Test create contact", {
            setUp: function() {
                this.firstName = "Peter";
                this.lastName = "Martin";
                this.cellNumber = 123678924;
                this.id = "4f08f1b04bcd790100000002";

                this.callback = this.spy();
                this.error = new Error();
            },
            "returns the id of the new contact": function() {
                var contact = { save: function() {} };
                var contactStub = this.stub( contact, "save" ).yields( null, { _id: this.id, firstName: this.firstName, lastName: this.lastName, cellNumber: this.cellNumber } );
                contact.save = contactStub;

                var contactModelStub = this.stub( ContactModel, "newInstance" ).returns( contact );

                contactDao.addContact( this.firstName, this.lastName, this.cellNumber, this.callback );

                assert( contactModelStub.called );
                assert( contactStub.called );
                assert.calledOnceWith( this.callback, null, { _id: this.id } );
                assert.equals( contact.firstName, this.firstName );
                assert.equals( contact.lastName, this.lastName );
                assert.equals( contact.cellNumber, this.cellNumber );
            },
            "without a callback": function() {
                var contact = { save: function() {} };
                var contactStub = this.stub( contact, "save" ).yields( null, { _id: this.id, firstName: this.firstName, lastName: this.lastName, cellNumber: this.cellNumber } );
                contact.save = contactStub;

                var contactModelStub = this.stub( ContactModel, "newInstance" ).returns( contact );

                contactDao.addContact( this.firstName, this.lastName, this.cellNumber );

                assert( contactModelStub.called );
                assert( contactStub.called );
                assert.equals( contact.firstName, this.firstName );
                assert.equals( contact.lastName, this.lastName );
                assert.equals( contact.cellNumber, this.cellNumber );                  
            },
            "with an error": function() {
                var contact = { save: function() {} };
                var contactStub = this.stub( contact, "save" ).yields( this.error );
                contact.save = contactStub;

                var contactModelStub = this.stub( ContactModel, "newInstance" ).returns( contact );

                contactDao.addContact( this.firstName, this.lastName, this.cellNumber, this.callback );

                assert( contactModelStub.called );
                assert( contactStub.called );
                assert.calledOnce( this.callback );
            },
            "with an error and no callback": function() {
                var contact = { save: function() {} };
                var contactStub = this.stub( contact, "save" ).yields( this.error );
                contact.save = contactStub;

                var contactModelStub = this.stub( ContactModel, "newInstance" ).returns( contact );

                contactDao.addContact( this.firstName, this.lastName, this.cellNumber );

                assert( contactModelStub.called );
                assert( contactStub.called );
            }
        }),
        buster.testCase("Test find all contacts by last name", {
            setUp: function() {
                this.lastName = "Martin";
                this.result = [ {}, {}, {} ];

                this.callback = this.spy();
                this.error = new Error();
            },
            "returns successfully": function () {
                var ModelMock = this.mock( ContactModel ).expects( "find" ).once().yields( null, this.result );

                contactDao.findAllContactsByLastName( this.lastName, this.callback );

                assert.calledOnceWith( this.callback, null, this.result );
                assert( ModelMock.verify() );
   	        },
            "without a callback": function () {
                var ModelMock = this.mock( ContactModel ).expects( "find" ).once().yields( null, this.result );

                contactDao.findAllContactsByLastName( this.lastName );

                assert( ModelMock.verify() );
            },
            "with an error": function() {
                var ModelMock = this.mock( ContactModel ).expects( "find" ).once().yields( this.error );

                contactDao.findAllContactsByLastName( this.lastName, this.callback );

                assert.calledOnceWith( this.callback, this.error );
                assert( ModelMock.verify() );
            }
            ,
            "with an error and no callback": function() {
                var ModelMock = this.mock( ContactModel ).expects( "find" ).once().yields( this.error );

                contactDao.findAllContactsByLastName( this.lastName );

                assert( ModelMock.verify() );
            }
        }),
        buster.testCase("Test update contact cell number", {
            setUp: function() {
                this.cellNumber = 123678924;
                this.id = "4f08f1b04bcd790100000002";

                this.callback = this.spy();
                this.error = new Error();
            },
            "returns successfully": function() {
                var ModelMock = this.mock( ContactModel ).expects( "update" ).once().yields( null, 1 );

                contactDao.updateCellNumber( this.id, this.cellNumber, this.callback );

                assert.calledOnceWith( this.callback, null, { count: 1 } );
                assert( ModelMock.verify() );
            },
            "without a callback": function() {
                var ModelMock = this.mock( ContactModel ).expects( "update" ).once().yields( null, 1 );

                contactDao.updateCellNumber( this.id, this.cellNumber );

                assert( ModelMock.verify() );
            },
            "with an error": function() {
                var ModelMock = this.mock( ContactModel ).expects( "update" ).once().yields( this.error );

                contactDao.updateCellNumber( this.id, this.cellNumber, this.callback );

                assert.calledOnceWith( this.callback, this.error );
                assert( ModelMock.verify() );
            },
            "with an error and no callback": function() {
                var ModelMock = this.mock( ContactModel ).expects( "update" ).once().yields( this.error );

                contactDao.updateCellNumber( this.id, this.cellNumber );

                assert( ModelMock.verify() );
            }
        }),
        buster.testCase("Test delete contact", {
            setUp: function() {
                this.id = "4f08f1b04bcd790100000002";

                this.callback = this.spy();
                this.error = new Error();
            },
            "successfully": function() {
                var ModelMock = this.mock( ContactModel ).expects( "remove" ).once().yields( null, 1 );

                contactDao.deleteContact( this.id, this.callback );

                assert.calledOnceWith( this.callback, null, { count: 1 } );
                assert( ModelMock.verify() );
            },
            "without a callback": function() {
                var ModelMock = this.mock( ContactModel ).expects( "remove" ).once().yields( null, 1 );

                contactDao.deleteContact( this.id );

                assert( ModelMock.verify() );
            },
            "with an error": function() {
                var ModelMock = this.mock( ContactModel ).expects( "remove" ).once().yields( this.error );

                contactDao.deleteContact( this.id, this.callback );

                assert.calledOnceWith( this.callback, this.error );
                assert( ModelMock.verify() );
            },
            "with an error and no callback": function() {
                var ModelMock = this.mock( ContactModel ).expects( "remove" ).once().yields( this.error );

                contactDao.deleteContact( this.id );

                assert( ModelMock.verify() );
            }
        })
    }
);