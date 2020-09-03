const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
app.use(bodyParser.json());
 
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'codingtest_bts'
});
 
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//get all users

app.get('/api/users',(req, res) => {
  let sql = "SELECT * FROM user";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(
    	JSON.stringify(
    		{"status": 200, "error": null, "response": results}
    		)
    	);
  });
});
 
//add user 
app.post('/api/users/signup',(req, res) => {
  let data = {
  		id : Math.random().toString(36).substring(7),
  		username : req.body.user.username,
		email : req.body.user.email,
		encrypted_password : req.body.user.encrypted_password,
		phone : req.body.user.phone,
		address : req.body.user.address,
		city : req.body.user.city,
		country : req.body.user.country,
		name : req.body.user.name,
		postcode : req.body.user.postcode,
  };

  let sql = "INSERT INTO user SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(
    	JSON.stringify(
    		{
    			"email": req.body.user.email, 
    			"token": null, 
    			"username": req.body.user.username
    		})
    	);
  });
});


//create new shopping
app.post('/api/shopping',(req, res) => {

  let id_ = Math.random().toString(36).substring(7);
  let data = {
  		id : id_,
		createddate : req.body.shopping.createddate,
		name : req.body.shopping.createddate,
  };
  console.log("req : "+req.body);
  let sql = "INSERT INTO shopping SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(
    	JSON.stringify(
    		{
    			"data" : {
    				"createddate": req.body.shopping.createddate, 
	    			"id": id_, 
	    			"username": req.body.shopping.name
    			}
    		})
    	);
  });
});
 
//get all shopping
app.get('/api/shopping',(req, res) => {
  let sql = "SELECT * FROM shopping";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(
    	JSON.stringify(
    		{
    			"status": 200, 
    			"error": null, 
    			"response": results}
    		)
    	);
  	});
});

//get shopping with id
app.get('/api/shopping/:id',(req, res) => {
  let sql = "SELECT * FROM shopping WHERE id="+"'"+req.params.id+"'";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    	res.send(JSON.stringify(
    		{
    			"status": 200, 
    			"error": null, 
    			"response": results}));
  });
});


//update shopping
app.put('/api/shopping/:id',(req, res) => {
  let sql = "UPDATE shopping SET createddate='"+req.body.shopping.createddate+"', name='"+req.body.shopping.name+"' WHERE id='"+req.params.id+"'";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify(
    	{
    		"status": 200, 
    		"error": null, 
    		"response": results}));
  });
});

//Delete shopping
app.delete('/api/shopping/:id',(req, res) => {
  let sql = "DELETE FROM shopping WHERE id='"+req.params.id+"'";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(
      	JSON.stringify(
      		{"status": 200, "error": null, "response": results}
      		)
      	);
  });
});

//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});
