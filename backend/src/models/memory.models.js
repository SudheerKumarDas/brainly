import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
    url:{
        type:String,
    },
    memoryType:{
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
    tags:[
        {
            type:String,
            trim:true
        }
    ],
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
        required:true
    },
    source:{
        type:String,
        trim:true
    },
    isFavorite:{
        type:Boolean,
        default:false
    },
    isArchived:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true
})

const Memory = mongoose.model("Memory",memorySchema);

export default Memory;