import Memory from "../models/memory.models.js";

export const createMemory = async (req,res) => {
    try {
        const userId = req.userId;
        const { url, memoryType, title, description, tags, source } = req.body;
        if(!url || !memoryType || !title || !description || !tags || !source){
            return res.status(400).json({
                message:"please provide all credentials"
            })
        }
        const existingMemory = await Memory.findOne({url,title,userId})
        if(!existingMemory){
            return res.status(409).json({
                message:"Memory already exists"
            })
        }
        const newMemory = await Memory.create({
            title,
            description,
            url,
            tags,
            userId,
            source
        })
        res.status(201).json({
            message:"Memory created successfully",
            memory:newMemory
        })
    } catch (error) {
        console.error(`Error creating memory : ${error}`);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const getAllMemories = async(req,res) => {
    try {
        const userId = req.userId;
        const memories = await Memory.find({userId,isDeleted:false}).sort({createdAt:-1});
        if(!memories){
            return res.status(404).json({
                message:"Memories not found"
            })
        }
        res.status(200).json({
            message:"Got all the memories",
            count:contents.length,
            memories:memories
        })
    } catch (error) {
        console.error(`Error in getting all contents : ${error}`);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const getMemory = async(req,res) => {
    try {
        const userId = req.userId;
        const memoryId = req.params.id;
        if(!memoryId){
            return res.status(400).json({
                message:"not valid memory"
            })
        }
        const memory = await Memory.findOne({_id:memoryId,userId:userId,isDeleted:false});
        if(!memory){
            return res.status(404).json({
                message:"memory not available"
            })
        }
        res.status(200).json({
            message:"get a single memory",
            data:memory
        })
    } catch (error) {
        console.error("Error in getting a memory :",error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const deleteMemory = async(req,res) => {
    try {
        const userId = req.userId;
        const memoryId = req.params.id;
        if(!memoryId){
            return res.status(400).json({
                message:"invalid memory"
            })
        }
        const memory = await Memory.findByIdAndDelete({_id:memoryId,isDeleted:false,userId:userId});
        if(!memory){
            return res.status(404).json({
                message:"memory not available"
            })
        }

        memory.isDeleted = true;
        await memory.save();

        res.status(200).json({
            message:"memory moved to trash successfully",
            memory:memory
        })
    } catch (error) {
        console.error("Error in deleting a memory :",error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const updateMemory = async(req,res) => {
    try {
        const userId = req.userId;
        const memoryId = req.params.id;
        if(!contentId){
            return res.status(400).json({
                message:"invalid memory"
            })
        }
        const updatedMemory = await Content.findByIdAndUpdate(memoryId,{$set:req.body},{returnDocument:"after"});
        if(!updatedMemory){
            return res.status(404).json({
                message:"invalid memory"
            })
        }
        res.status(200).json({
            message:"memory updated successfully",
            data:updateContent
        })
    } catch (error) {
        console.error("Error in updating a memory :",error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const toogleFavorite = async(req,res) => {
    try {
        const userId = req.userId;
        const memoryId = req.params.id;
        const memory = await Memory.findOne({userId:userId,_id:memoryId,isDeleted:false});
        if(!memory){
            return res.status(404).json({
                message:"Memory not found"
            })
        }
        memory.isFavorite =! memory.isFavorite;
        await memory.save();
        res.status(200).json({
            message:memory.isFavorite ? "Memory Favorited" : "Memory unfavorited",
            memory:memory
        })
    } catch (error) {
        console.error("Error in toggling favorite memory");
        res.status(500).json({
            message:"Internal server error"
        })
    }
}