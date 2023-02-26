const Express = require("express");
const Mongoose = require("mongoose");
const UserModel = require("./model/Users");
const EmployeeModel = require('./model/Employees')
const Bodyparser = require("body-parser");
const Cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let app = Express();

app.use(Bodyparser.urlencoded({ extended: true }));
app.use(Bodyparser.json());
app.use(Cors());

Mongoose.connect(
  "mongodb+srv://shahavas:shavas123@cluster0.7fj7v4l.mongodb.net/EmployeeApp-DB?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

 
app.post("/signin", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  let result = UserModel.find({ email: email }, (err, data) => {
    if (data.length>0) {
      const passwordvalidator = bcrypt.compareSync(password,data[0].password);
      if (passwordvalidator) {
        jwt.sign(
          { email: email, id: data[0]._id },
          "fristtoken",
          { expiresIn: "1d" },
          (err, token) => {
            if (err) {
              res.json({ status: "Error", error: err });
            } else {
              res.json({ status: "success", data: data, token: token });
            }
          }
        );
      } else {
        res.json({ status: "filed", data: "invalid password" });
      }
    } else {
     if (email == "admin") {
      if (password == "admin123") {
            res.json({ status: "admin" });
          } else {
           
          }
     } else {
      res.json({ status: "filed", data: "invalid email" });
     }
    }
    
  });
  
   
});

 

app.post("/signup", async (req, res) => {

//signup
  var data = new UserModel({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    name: req.body.name,
    phonenumber: req.body.phonenumber,
  });
  await data.save((err, data) => {
    if (data) {
      res.json({ status: "success", data: data });
    } else {
      res.json({ status: "Error", Error: err });
    }
  });
});


app.post('/addemployee',(req,res)=>{
//add an employee

var data =new EmployeeModel({
    name:req.body.name
})
data.save((err,data)=>{
    if (data) {
        res.json({ status: "success", data: data})
    } else {
        res.json({ status: "filed"})
    }
})
})


app.post('/delete',(req,res)=>{
//delete
EmployeeModel.findOneAndDelete({name:req.body.name},(err,data)=>{
    if (data) {
        res.json({ status: "deleted"})
    } else {
        res.json({ status: "filed"}) 
    }
})

})


app.post('/update',(req,res)=>{
   var name=req.body.name
   var data={name:req.body.newname}
   EmployeeModel.findOneAndUpdate(name,data,(err,data)=>{
        if (data) {
          res.json({ status: "success", data: data });
          } else {
            res.json({ status: "Error", Error: err });
          }
        });
});


app.post("/allemployee",async(req,res)=>{
  try {
    var post = await EmployeeModel.find()
    res.send(post)
  } catch (error) {
    res.status(500).send(error)
  }
})



app.listen(3001, () => {
  console.log("Lisening on the Port...");
});
