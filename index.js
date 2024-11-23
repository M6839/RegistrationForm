const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.json());
app.use(express.static('signup'));
app.use(bodyParser.urlencoded({
    extended:true
})
);
mongoose.connect('mongodb://localhost:27017/mydb');
const db=mongoose.connection;
db.on('error',()=>{console.log("error for connecting ths db")});
db.once('open',()=>{console.log('db connected successfully')});
app.post('/Signup',(req,res)=>{
    var name=req.body.name;
    var age=req.body.age;
    var gender=req.body.gender;
    var phoneNo=req.body.phoneNo;
    var Email=req.body.Email;
    var password=req.body.password;

    let data={
        "name":name,
        "age":age,
        "gender":gender,
        "phoneNo":phoneNo,
        "Email":Email,
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err
        }
        console.log("regisred successfully");
    })
    return res.redirect('RegistrationSuccess.html');

});
app.get('/',(req,res)=>{
    res.set({"Allow access allow origin":'*'});
    return res.redirect("index.html");
}).listen(3000);
console.log("server is running ....");