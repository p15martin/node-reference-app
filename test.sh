git commit -a -m "testing"
git push heroku master
heroku logs
#curl -H "Content-Type: application/json" -d '{ "jsonrpc": "2.0", "method": "findAllContactsByLastName", "params": ["Bloggs"], "id":2 }' -i http://deep-fire-3746.herokuapp.com
