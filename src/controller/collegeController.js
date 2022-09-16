const internModel= require ('../model/internModel')
const collegeModel=require ('../model/collegeModel')

const validator= require('../validator/validator')

const createCollege = async function(req,res){
    try {
        let data = req.body 
        if (Object.keys(data).length==0)  return res.status(400).send({status : false , msg : "body is empty "})
        
        let {name , fullName, logoLink ,isDeleted }= data

        if (!validator.isValidElem(name)) return res.status(400).send({status : false , msg : "name is require "})
        if (!validator.isValidName(name)) return res.status(400).send({status : false , msg : "name should be in alphabets"})
        let findName = await collegeModel.findOne({name})
        if (findName)  return res.status(400).send({status : false , msg : "the college name is already present"})
 
        if (!validator.isValidElem(fullName)) return res.status(400).send({status : false , msg : "full name is require"})
        if (!validator.isValidName(fullName)) return res.status(400).send({status : false , msg : " full name should be in alphabets"})

        if (!validator.isValidElem(logoLink)) return res.status(400).send({status : false , msg : "logoLink is require"})

        let document ={
            name : name.trim() ,
            fullName:fullName.trim(),
            logoLink:logoLink,
            isDeleted: isDeleted?isDeleted:false
        }

        let saveData = await collegeModel.create(document)
        return res.status(201).send({status: true , data : saveData})


    }catch(err){
        return res.status(500).send({status :false , msg : err.message})
    }
}

const getdata = async function (req , res) {
    try {

        let requestQuery = req.query.collegeName
        if (!requestQuery) return res.status(400).send({status : false , msg : "college name in query is important "})
        let collegedata = await collegeModel.findOne({name :requestQuery})
        if(!collegedata)  return res.status(400).send({status : false , msg : "No college present with this College name"})
        let collegeDataId = collegedata._id
        let interns= await internModel.find({collegeId : collegeDataId}).select({name :1 ,email :1 ,mobile : 1 ,_id : 1})
        if(interns.length ==0 ) return res.status(400).send({status : false , msg : "No intern present in this college"})

        let document  = {
            name : collegedata.name,
            fullName : collegedata.fullName,
            logoLink : collegedata.logoLink,
            intern : interns
        }

        return res.status(200).send({ status : true ,data : document })

    }catch (err) {
        return res.status(500).send({status : false , msg : err.message})
    }
}




module.exports={
    getdata,
    createCollege
    
}