const mongoose=require('mongoose')

const schema=mongoose.Schema

const mealRequestSchema=new schema({
   RequestrFood:{
    type:String,
    require:true
   },
},{timestamps:true})
module.exports=mongoose.model('mealRequest',mealRequestSchema)