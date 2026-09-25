import Content from "../models/contentModels.js";

export const contentCreate = async (req,res) => {
    try {
        const userId = req.userId;
        const { url, contentType, title, description, tags } = req.body;
        if(!url || !contentType || !title || !description ||!tags){
            return res.status(400).json({
                message:"please provide all credentials"
            })
        }
        const existingContent = await Content.findOne({url,title,userId})
        if(!existingContent){
            return res.status(409).json({
                message:"Content already exists"
            })
        }
        const newContent = await Content.create({
            title,
            description,
            url,
            tags,
            userId
        })
        res.status(201).json({
            message:"Content created successfully",
            data:newContent
        })
    } catch (error) {
        console.error(`Error creating content : ${error}`);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const getAllContents = async(req,res) => {
    try {
        const userId = req.userId;
        const contents = await Content.find({userId})
        if(!contents){
            return res.status(404).json({
                message:"Contents not found"
            })
        }
        res.status(200).json({
            message:"Got all the contents",
            contents:contents
        })
    } catch (error) {
        console.error(`Error in getting all contents : ${error}`);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const getAContent = async(req,res) => {
    try {
        const userId = req.userId;
        const contentId = req.params.id;
        if(!contentId){
            return res.status(400).json({
                message:"not valid content"
            })
        }
        const content = await Content.findOne({_id:contentId,userId:userId});
        if(!content){
            return res.status(404).json({
                message:"content not available"
            })
        }
        res.status(200).json({
            message:"get a single content",
            data:content
        })
    } catch (error) {
        console.error("Error in getting a content ",error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const deleteAContent = async(req,res) => {
    try {
        const userId = req.userId;
        const contentId = req.params.id;
        if(!contentId){
            return res.status(400).json({
                message:"invalid content"
            })
        }
        const content = await Content.findByIdAndDelete(contentId);
        if(!content){
            return res.status(404).json({
                message:"Content not available"
            })
        }
        res.status(200).json({
            message:"content deleted successfully",
            data:content
        })
    } catch (error) {
        console.error("Error in deleting a content ",error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const updateContent = async(req,res) => {
    try {
        const userId = req.userId;
        const contentId = req.params.id;
        if(!contentId){
            return res.status(400).json({
                message:"invalid content"
            })
        }
        const updatedContent = await Content.findByIdAndUpdate(contentId,{$set:req.body},{returnDocument:"after"});
        if(!updatedContent){
            return res.status(404).json({
                message:"invalid content"
            })
        }
        res.status(200).json({
            message:"content updated successfully",
            data:updateContent
        })
    } catch (error) {
        console.error("Error in updating a content ",error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}