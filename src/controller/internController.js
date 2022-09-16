const collegeModel = require('../model/collegeModel');
const internModel = require('../model/internModel');
const validator = require ("../validator/validator");
const createintern = async function (req , res) {
    try {

        let data = req.body;
        let {name , mobile , email }=data
        
        let college = data.collegeName;
        let newintern = await collegeModel.findOne({name : college });

        if (Object.keys(data).length==0)  return res.status(400).send({status : false , msg : "body is empty "})

        if (!validator.isValidElem(name)) return res.status(400).send({status : false , msg : "name is require "})
        if (!validator.isValidName(name)) return res.status(400).send({status : false , msg : "name should be in alphabets"})

        
        if (!validator.isValidElem(email)) return res.status(400).send({status : false , msg : "email is require "})
        if (!validator.isValidEmail(email)) return res.status(400).send({status : false , msg : "email must in correct formate"})
        let findemail= await internModel.findOne ({ email})
        if (findemail) return res.status(400).send({status : false , msg : "email is already present"})


        if (!validator.isValidElem(mobile)) return res.status(400).send({status : false , msg : "mobile number is require "})
        if (!validator.isValidmobile(mobile)) return res.status(400).send({status : false , msg : "mobile number must be 10 digits"})
        let findmobile= await internModel.findOne ({ mobile})
        if (findmobile) return res.status(400).send({status : false , msg : "mobile number is already present"})

        if(!newintern) return res.status(400).send({status : false, "msg" : "No intern found with proper college name"});
        let collegeid = newintern["_id"];

        let newIntern = {
            name : name.trim(),
            mobile : mobile.trim(),
            email : email,
            collegeId : collegeid,
            
        }
        let saveData= await internModel.create(newIntern)
       
        return res.status(201).send({ status : true , msg : saveData });

    }catch (err) {
        return res.send({status : false , msg : err.message})
    }
}


module.exports.createintern =createintern