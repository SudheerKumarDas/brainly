import mongoose from "mongoose";
import User from "./userModels";

const contentSchema = new mongoose.Schema({
    link:{
        type:String,
    },
    type:{
        type:String,
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    tags:{
        type:[String]
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:User
    }
},{
    timestamps:true
})

const Content = mongoose.model("Content",contentSchema);

export default Content;