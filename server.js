// server.js
const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app=express();
const mysql=require('mysql2');
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'db2',
    password:"SHnj575575"
});
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.listen(8080,()=>{
    console.log("app is listening");
});
// app.get("/getlst",(req,res)=>{
// //     let q="select * from TaskList";
// // connection.query(q,(err,res)=>{
// //     // res.json({value:res});
// //     res.json({ message: 'Hello, world!' });
// //     console.log(res);
// // });
    
    
//     res.json({user:['abhay','kunal','nirbhay']}
//     });

app.get('/getlst', (reqg, resul) => {
    // let arr=[];
    let q="select * from TaskList";
    connection.query(q,(err1,resc)=>{console.log(resc);
       resul.json({val:resc});
    });
    // resul.json({name:"abhay r ksad"});
   
  });

app.post('/pst',(req,res)=>{
    let q="insert into TaskList (Task) values (?)";
connection.query(q,[req.body.task.trim()],(err,res)=>{
    // console.log(res);
})
console.log(req.body.task);
});

app.post('/del',(req,res)=>{
    let q="DELETE FROM TaskList WHERE Task=?";
    try{
        let val=req.body.task.trim();
        connection.query(q,val,(err,res)=>{
            console.log(req.body.task);
            console.log("successfull");

        });
    }catch(err){
        console.log(err);
    }

// console.log(req.body.task);
// console.log(req.body.task);
});
