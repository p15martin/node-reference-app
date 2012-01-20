var requirejs = require( "requirejs" );
requirejs.config( require( process.env.PWD + "/config" ) );

requirejs(
    [ "buster", "contactDao", "ContactModel" ],
    function( buster, contactDao, ContactModel ) {
        buster.testCase("Test contact DAO", {
            setUp: function() {
                this.firstName = "Peter";
                this.lastName = "Martin";
                this.cellNumber = 123678924;
                this.id = "4f08f1b04bcd790100000002";

                // this.Model = contactModel.Model;
                this.callback = this.spy();
                this.error = new Error();
            },
            "add a new contact": function () {
                var contact = { save: function() {} };
                contact.save = this.stub( contact, "save" ).yields( null );

                var contactModelStub = this.stub( ContactModel, "newInstance" ).returns( contact );

                contactDao.addContact( this.firstName, this.lastName, this.cellNumber, this.callback );

                assert.calledOnce( this.callback );
                assert.equals( contact.firstName, this.firstName );
                assert.equals( contact.lastName, this.lastName );
                assert.equals( contact.cellNumber, this.cellNumber );
            },
            "add a new contact error": function () {
                var contact = { save: function() {} };
                contact.save = this.stub( contact, "save" ).yields( this.error );

                var contactModelStub = this.stub( ContactModel, "newInstance" ).returns( contact );

                contactDao.addContact( this.firstName, this.lastName, this.cellNumber, this.callback );

                assert.calledOnce( this.callback );
            },
            "find all contacts by last name": function () {
                var ModelMock = this.mock( ContactModel ).expects( "find" ).once().yields( "{}" );

                contactDao.findAllContactsByLastName( this.lastName, this.callback );

                assert.calledOnce( this.callback );
                assert( ModelMock.verify() );
   	        },
            "find all contacts by last name error": function () {
                var ModelMock = this.mock( ContactModel ).expects( "find" ).once().yields( this.error );

                contactDao.findAllContactsByLastName( this.lastName, this.callback );

                assert.calledOnceWith( this.callback, this.error );
                assert( ModelMock.verify() );
            },
            "update cell number": function () {
                var ModelMock = this.mock( ContactModel ).expects( "update" ).once().yields( "{}" );

                contactDao.updateCellNumber( this.id, this.cellNumber, this.callback );

                assert.calledOnce( this.callback );
                assert( ModelMock.verify() );
            },
            "update cell number error": function () {
                var ModelMock = this.mock( ContactModel ).expects( "update" ).once().yields( this.error );

                contactDao.updateCellNumber( this.id, this.cellNumber, this.callback );

                assert.calledOnceWith( this.callback, this.error );
                assert( ModelMock.verify() );
            }
            ,
            "delete contact": function () {
                var ModelMock = this.mock( ContactModel ).expects( "remove" ).once().yields( "{}" );

                contactDao.deleteContact( this.id, this.callback );

                assert.calledOnce( this.callback );
                assert( ModelMock.verify() );
            },
            "delete contact error": function () {
                var ModelMock = this.mock( ContactModel ).expects( "remove" ).once().yields( this.error );

                contactDao.deleteContact( this.id, this.callback );

                assert.calledOnceWith( this.callback, this.error );
                assert( ModelMock.verify() );
            }
        });
    }
);