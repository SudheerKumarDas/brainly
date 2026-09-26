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

export const toogleArchived = async(req,res) => {
    try {
        const userId = req.userId;
        const memoryId = req.params.id;
        const memory = await Memory.findOne({_id:memoryId,userId:userId,isDeleted:false});
        if(!memory){
            return res.status(404).json({
                message:"Memory not available"
            })
        }
        memory.isArchived = !memory.isArchived;
        await memory.save();

        res.status(200).json({
            message:memory.isArchived  ? "memory is archived" : "memory is unarchived",
            memory:memory
        })
    } catch (error) {
        console.error("Error in toggling memory archived :",error);
        res.status()
    }
}

export const restoreMemory = async(req,res) => {
    try {
        const userId = req.userId;
        const memoryId = req.params.id;
        const memory = await Memory.findOne({userId:userId,_id:memoryId,isDeleted:true});
        if(!memory){
            return res.status(404).json({
                message:"memory not found"
            })
        }
        memory.isDeleted = false;
        await memory.save();

        res.status(200).josn({
            message:"Memory is restored successfully",
            memory:memory
        })
    } catch (error) {
        console.error("Error in restoring memory");
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const deleteMemoryPermanently = async(req,res) => {
    try {
        const userId = req.userId;
        const memoryId = req.params.id;
        const memory = await Memory.findOneAndDelete({_id:memoryId,userId:userId,isDeleted:true});
        if(!memory){
            return res.status(404).json({
                message:"Memory not found"
            })
        }
        res.status(200).json({
            message:"Memory deleted permanently"
        })
    } catch (error) {
        console.error("Error in deleting memory permanently :",error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const getDeletedMemories = async(req,res) => {
    try {
        const userId = req.userId;
        const deletedMemories = await Memory.find({userId:userId,isDeleted:true});
        if(!deletedMemories){
            return res.status(404).json({
                message:"Memory not found"
            })
        }
        res.status(200).json({
            message:"Deleted memories in trash",
            deletedMemories:deletedMemories
        })
    } catch (error) {
        console.error("Error in deleting memory permanently :",error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const queryMemories = async(req,res) => {
    try {
        const userId = req.userId;
        const {q,tag,source,favorite,archived,sort="newest",page=1,limit=10} = req.query;
        const filter = {
            userId:userId,
            isDeleted:false
        }
        // for searching the memories like querying for favorite or archived memories
        if(q){
            filter.$or = [
                {
                    title:{
                        $regex:q,
                        $options:"i"
                    }
                },
                {
                    description:{
                        $regex:q,
                        $options:"i"
                    }
                },
                {
                    tags:{
                        $regex:q,
                        $options:"i"
                    }
                }
            ];
        }

        // filter by tags
        if(tag){
            filter.tags = tag;
        }

        if(source){
            filter.source = source;
        }

        if(favorite !== undefined){
            filter.isFavorite = favorite === "true";
        }

        if(archived !== undefined){
            filter.isArchived = archived === "true";
        }else{
            filter.isArchived = false;
        }

        // pagination
        const pageNumber = Math.max(Number(page),1);
        const limitNumber = Math.min(Math.max(Number(limit),1),100);
        const skip = (pageNumber - 1) * limitNumber;

        // sorting
        let sortOptions = {};
        if(sort==="oldest"){
            sortOptions={
                createdAt:1
            }
        }else{
            sortOptions={
                createdAt:-1
            }
        }

        const [memories,total] = await Promise.all([
            Memory.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNumber),
            Memory.countDocuments(filter)
        ]);

        const totalPages = Math.ceil(total/limitNumber);

        res.status(200).json({
            memories,
            pagination:{
                total,
                page:pageNumber,
                limit:limitNumber,
                totalPages,
                hasNextPage:pageNumber < totalPages,
                hasPreviousPage: pageNumber > 1
            }
        });
    } catch (error) {
        console.error("Error in quering the memories :",error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}