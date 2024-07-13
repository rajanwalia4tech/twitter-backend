const express = require('express');
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/', function (request, response) {
    console.log("Query ",request.query);
    console.log("Params ",request.params);
    response.send("Hello World ");
});


app.post('/', function (request, response) {
    console.log("body ",request.body);
    response.send("Hello World ");
});

app.listen(3000,function(){
    console.log('App Listening to port 3000') 
});