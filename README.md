Introduction
============
This is a reference application for [Node.js](http://nodejs.org/). It is intended to demonstrate the following principles:
* test coverage
* clean code
* separation of concerns
* modularity
* error handling
* logging
* timing
* log correlation

The reference app makes use of the following packages:
* [RequireJS](http://requirejs.org/) - used for modularity of the codebase and to manage dependencies
* [Connect](https://github.com/senchalabs/connect) - provides a middleware framework 
* [Connect-JSONRPC](https://github.com/visionmedia/connect-jsonrpc) - provides [JSON-RPC 2.0](http://jsonrpc.org/spec.html) support via the Connect middleware framework
* [Mongoose](http://mongoosejs.com/) - object modelling tool for [MongoDB](http://www.mongodb.org/)
* [Async](https://github.com/caolan/async) - asynchronous flow control (e.g. performing tasks in sequence or parallel) 
* [node-uuid](https://github.com/broofa/node-uuid) - generation of RFC4122 UUIDS, which is used to generate a unique logid for correlating related activities


The app
-------
The app is intended to be simple. It exposes a basic set of [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations as JSON-RPC services. My database of choice is [MongoDB](http://www.mongodb.org/).


Running the tests
-----------------
Like the professional programmers we are, lets start with the tests. I choose [Buster](http://busterjs.org/) for my test framework and [Sinon.JS](http://sinonjs.org/) for my [test spies](http://xunitpatterns.com/Test%20Spy.html), [stubs](http://xunitpatterns.com/Test%20Stub.html), and [mocks](http://xunitpatterns.com/Mock%20Object.html).

First off clone the code from GitHub.

Next, make sure you are at the command prompt and are in the directory that contains the code for the reference app.

Install the package dependencies:

	npm install

Install [Buster](http://busterjs.org/):

	sudo npm install –g buster 

(if you have problems installing Buster please refer to this [page](http://busterjs.org/docs/getting-started/))

Run the tests:

	buster test

Easy! The convenience of the Buster test runner makes it ideal for integration with a CI server such as [Jenkins](http://jenkins-ci.org/). It also has a headless test runner, which is ideal for your client-side tests.


Deploy to Heroku
----------------
I developed the reference app against [Heroku](http://www.heroku.com/). For my [MongoDB](http://www.mongodb.org/) database I used the Heroku [add-on](http://addons.heroku.com/) for [MongoLab](https://mongolab.com/home).

If you don't already have an account on [Heroku](http://www.heroku.com/) then create one and [install](http://devcenter.heroku.com/articles/heroku-command) the command line client (CLI).

Again, make sure you are at the commond prompt, from the directory that contains the code for the reference app.

Create an app on Heroku using the [Cedar stack](http://devcenter.heroku.com/articles/cedar):

	heroku create --stack cedar

When your app has been created you should see the app name e.g. cold-stone-7259.

Add your Heroku app as a remote repository (remember to use your app name):

	git remote add heroku git@heroku.com:cold-stone-7259.git

Add the [MongoLab add-on](http://addons.heroku.com/mongolab):

	heroku addons:add mongolab:starter

Deploy the app (using a git push):

	git push heroku master

If you tail the logs you should see that the app has started:

	heroku logs -s app --tail


Use the app
-----------

We will continue to work at the command prompt. If you want open a second terminal window, again from the directory that contains code for the reference app, tail the logs so you can see what is going on.

I am using [cURL](http://curl.haxx.se/) to hit the RPC services. As before, remember to use your app name in the URL.

Add a contact:

	curl -H "Content-Type: application/json" -d '{ "jsonrpc": "2.0", "method": "addContact", "params": ["Peter", "Martin", 123678924], "id":2 }' -i http://cold-stone-7259.herokuapp.com

	curl -H "Content-Type: application/json" -d '{ "jsonrpc": "2.0", "method": "addContact", "params": ["Joe", "Bloggs", 789678068], "id":2 }' -i http://cold-stone-7259.herokuapp.com

	curl -H "Content-Type: application/json" -d '{ "jsonrpc": "2.0", "method": "addContact", "params": ["Fred", "Bloggs", 789461207], "id":2 }' -i http://cold-stone-7259.herokuapp.com

	curl -H "Content-Type: application/json" -d '{ "jsonrpc": "2.0", "method": "addContact", "params": ["John", "Doe", 123563846], "id":2 }' -i http://cold-stone-7259.herokuapp.com

Find all contacts by last name:

	curl -H "Content-Type: application/json" -d '{ "jsonrpc": "2.0", "method": "findAllContactsByLastName", "params": ["Martin"], "id":2 }' -i http://cold-stone-7259.herokuapp.com

	curl -H "Content-Type: application/json" -d '{ "jsonrpc": "2.0", "method": "findAllContactsByLastName", "params": ["Bloggs"], "id":2 }' -i http://cold-stone-7259.herokuapp.com

Update the cell number for a contact:

	curl -H "Content-Type: application/json" -d '{ "jsonrpc": "2.0", "method": "updateCellNumber", "params": ["4f1a0dc1458dbb0100000001", 111222333], "id":2 }' -i  http://cold-stone-7259.herokuapp.com

Delete a contact:

	curl -H "Content-Type: application/json" -d '{ "jsonrpc": "2.0", "method": "deleteContact", "params": ["4f1a0dc1458dbb0100000001"], "id":2 }' -i http://cold-stone-7259.herokuapp.com
