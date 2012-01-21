Introduction
================================

This is a reference application for Node.js. It is intended to demonstrate the following principles:

* test coverage
* clean code
* separation of concerns
* modularity
* error handling
* logging
* timing
* log correlation

It makes use of the following packages:

* RequireJS
* Connect
* Connect-JSONRPC
* Mongoose
* Async


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