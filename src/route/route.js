const express = require('express')
const route = express.Router()
const collegeController = require ("../controller/collegeController")
const internController =require("../controller/internController")

route.get('/test-me' ,function(req,res){
    res.send({msg : "working fine "})
})


route.post('/functionup/colleges',collegeController.createCollege )
route.post('/functionup/interns',internController.createintern)
route.get('/functionup/collegeDetails',collegeController.getdata)

route.all("/**",  (req, res) => {
    res.status(400).send({ status: false, msg: "The api you request is not available" })
});

module.exports=route
