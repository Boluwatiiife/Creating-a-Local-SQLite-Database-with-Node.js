const express = require('express');
const app = express();
const db = require('./db.js');
const server = app.listen(8088, function(){
    console.log('Server ready');
})

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/new', function(req,res){
    res.sendFile(__dirname + '/add.html');
})

app.post('/adder',function(req,res){
    console.log(req.body);
    console.log(req.body['first']);
    let sql = 'INSERT INTO users\
    (first, last,email,password) VALUES\
    (?,?,?,?)';
    db.run(sql,
        [req.body['first'],req.body['last'],
        req.body['email'],req.body['password']],
    function(err,row){
        if(err){
            throw err
        }
        res.json({'data':this.lastID})
    })


})

app.get('/users/:id',function(req,res){
    const query = "SELECT * from users where\
    id = ?";
    console.log(req.params.id);
    const params = [req.params.id];
    db.all(query,params, function(err,row){
        if(err){
            throw err;
        }
        res.json({'status':row}) 
    })
})

app.get('/users',function(req,res){
        const query = "SELECT * from users";
    db.all(query, function(err,rows){
        if(err){
            throw err;
        }
        res.json({'status':rows});
    })
})

app.get('/', function(req,res){
    res.json({'status':'ready!'})
})
