import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    link:{
        type:String,
    },
    contentType:{
        type:String,
        enum:[
            "note",
            "audio",
            "video",
            "document",
            "social"
        ]
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    tags:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Tags",
        lowercase:true,
        trim:true
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
})

const Content = mongoose.model("Content",contentSchema);

export default Content;