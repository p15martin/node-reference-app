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

It makes use of the following packages:

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

First off clone the code from GitHub and make sure you are at the command prompt in the directory that has the code.

Install the package dependencies:
	npm install




The service API simply allows CRUD operations against the database. You can call them using cURL as follows (remember to substitute the application URL with your application URL):

curl -H "Content-Type: application/json" -d '{ "jsonrpc": "2.0", "method": "addContact", "params": ["Peter", "Martin", 123678924], "id":2 }' -i http://deep-fire-3746.herokuapp.com
curl -H "Content-Type: application/json" -d '{ "jsonrpc": "2.0", "method": "addContact", "params": ["Joe", "Bloggs", 789678068], "id":2 }' -i http://deep-fire-3746.herokuapp.com
curl -H "Content-Type: application/json" -d '{ "jsonrpc": "2.0", "method": "addContact", "params": ["Fred", "Bloggs", 789461207], "id":2 }' -i http://deep-fire-3746.herokuapp.com
curl -H "Content-Type: application/json" -d '{ "jsonrpc": "2.0", "method": "addContact", "params": ["John", "Doe", 123563846], "id":2 }' -i http://deep-fire-3746.herokuapp.com

curl -H "Content-Type: application/json" -d '{ "jsonrpc": "2.0", "method": "findAllContactsByLastName", "params": ["Martin"], "id":2 }' -i http://deep-fire-3746.herokuapp.com
curl -H "Content-Type: application/json" -d '{ "jsonrpc": "2.0", "method": "findAllContactsByLastName", "params": ["Bloggs"], "id":2 }' -i http://deep-fire-3746.herokuapp.com

curl -H "Content-Type: application/json" -d '{ "jsonrpc": "2.0", "method": "updateCellNumber", "params": ["4f08f1aa4bcd790100000001", 111222333], "id":2 }' -i  http://deep-fire-3746.herokuapp.com

curl -H "Content-Type: application/json" -d '{ "jsonrpc": "2.0", "method": "deleteContact", "params": ["4f08f1aa4bcd790100000001"], "id":2 }' -i http://deep-fire-3746.herokuapp.com


Deploy to Heroku

heroku create --stack cedar

git remote add heroku git@heroku.com:cold-stone-7259.git

heroku addons:add mongolab:starter

git push heroku master