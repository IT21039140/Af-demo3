const RequestrF=require('../models/mealRequestmodels')
const mongoose=require('mongoose')

const getAllrequest=async(req,res)=>{
    const requests=await RequestrF.find()
    res.status(200).json(requests)
}

const addRequests=async(req,res)=>{
    const {RequestrFood}=req.body

    //add meal to db
    try{
        const Requests=await RequestrF.create({RequestrFood})
        res.status(200).json(Requests)
    }
    catch (error) {
        res.status(400).json({error:error.message})
    }
}
const deleteReq=async(req,res)=>{
    const{id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such meal requested/delete'})
    }
    const foodReq=await RequestrF.findOneAndDelete({_id: id})
    
    if(!foodReq){
        return res.status(400).json({error:'No such meal requested'})
    }
    res.status(200).json(foodReq)
}

module.exports={
    getAllrequest,
    addRequests,
    deleteReq
}