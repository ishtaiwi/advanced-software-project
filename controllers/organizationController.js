const orga =require('../models/organizationModel');

exports.getAllOrganizations =(req,res)=>{
  orga.getAll((err,result)=>{
    if (err) return res.status(500).json({error:err.message});
    res.json(result);
  });
};

exports.verifyOrganization =(req,res)=>{
  const {id} =req.params;
  orga.verify(id,(err)=> {
    if (err) return res.status(500).json({error:err.message});
    res.json({msg:'organization verified'});
  });
};

exports.createOrganization =(req,res) =>{
  const{name,address}=req.body;
  orga.create([name,address],(err,result)=>{
    if(err) return res.status(500).json({error:err.message});
    res.status(201).json({msg:'organization created',id:result.insertId});
  });
};
exports.deleteOrganization =(req,res)=>{
  const {id}= req.params;
  orga.delete(id,(err)=>{
    if (err) return res.status(500).json({error:err.message});
    res.json({msg:'Organization deleted'});
  });
};
