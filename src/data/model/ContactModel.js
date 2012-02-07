define(
    [ "mongoose" ],
    function( mongoose ) {
        var ContactModel = mongoose.model( "ContactModel", new mongoose.Schema({
			firstName : { type: String, required: true },
			lastName : { type: String, required: true },
			cellNumber : { type: Number }
		}));

        ContactModel.newInstance = function() { return new ContactModel(); }

        return ContactModel;
    }
);