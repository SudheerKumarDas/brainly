import mongoose from "mongoose";

const shareableLinkSchema = new mongoose.Schema({
    token:{
        type:String,
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    contents:{
        type:[String]
    },
},{
    timestamps:true
})

const ShareableLink = mongoose.model("ShareableLink",shareableLinkSchema);

export default ShareableLink;