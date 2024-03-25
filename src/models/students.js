import mongoose from "mongoose";

const collection = "Students"

const schema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true,
    },
    edad:{
        type:Number,
        required:true
    },
    dni:{
        type:String,
        required:true
    },
    curso:{
        type:String,
        renum:["backend","frontend"],
        default:"backend"
    },
    nota:{
        type:String,
        required:true
    },

})

const studentModel = mongoose.model(collection,schema);

export default studentModel;