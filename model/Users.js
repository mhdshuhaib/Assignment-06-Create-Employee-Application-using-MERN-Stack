const Mongoose=require('mongoose')
const UserSchema=Mongoose.Schema({
    email:String,
    password:String,
    name:String,
    phonenumber:String
})
 
const UserModel=Mongoose.model('Users',UserSchema)

module.exports=UserModel