import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

const Tags = mongoose.model("Tags",tagsSchema);

export default Tags;