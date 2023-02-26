const Mongoose = require('mongoose')
const EmployeeSchema=Mongoose.Schema({
    name:String
})

const EmployeeModel=Mongoose.model('Employees',EmployeeSchema)

module.exports=EmployeeModel;