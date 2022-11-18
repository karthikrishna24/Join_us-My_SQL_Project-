var express = require('express');
var app = express();
var bodyparser=require("body-parser");
var mysql= require('mysql');

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname +"/public"));


var connect= mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'join_us'
});

app.get("/",function(req,re){
	var t= connect.query("SELECT COUNT(*) AS count FROM users",function(err,res,field){
		if (err) throw err;
		var count =res[0].count;
		var msg=('The total count is' + " " +res[0].count + " " + 'users');
		// re.send(msg);
		re.render("home",{count: count});
		
	})
})

app.post("/register",function(req,res){
	var person = {email: req.body.email};
	connect.query("INSERT INTO users SET?",person,function(err,result){
		if (err) throw err;
		res.redirect("/");
	})
})

// app.get("/joke",function(req,res){
// 	var a="Singing in the shower is fun until you get soap in your mouth. Then it's a soap opera."
// 	res.send(a);
// 	console.log("Page loading");
// });

// app.get("/random_num",function(req,res){
// 	var b = Math.floor((Math.random()*10))+1;
// 	console.log(b);
// 	res.send("Luckey num" + b);
// })

app.listen(3000,function(){
	console.log("Server 3000 is running");
});

