const express=require('express')

const {
    getAllrequest,
    addRequests,
    deleteReq
}=require('../controllers/requestController')

const newrouter =express.Router()

//get all user requested food items
newrouter.get('/requests',getAllrequest)

//add food requests
newrouter.post('/requests',addRequests)

//delete request
newrouter.delete('/requests/:id',deleteReq)

module.exports = newrouter