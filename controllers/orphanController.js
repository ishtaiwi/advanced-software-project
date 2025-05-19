const orphan =require('../models/orphanModel');
const sponsorship =require('../models/sponsorshipModel');
const OrphanUpdate =require('../models/orphanUpdateModel');

exports.createOrphan =(req,res) => {
  const {name,age,education_status,health_condition}=req.body;

  orphan.findByName(name,(err,existing)=>{
    if (err) return res.status(500).json({error:err.message});

    if (existing.length > 0){
      return res.status(400).json({msg:'An orphan with this name already exists'});
    }

    orphan.create([name,age,education_status,health_condition],(err,result)=>{
      if(err) return res.status(500).json({error:err.message});
      res.status(201).json({message:'orphan added successfully',id:result.insertId});
    });
  });
};

exports.getAllOrphans =(req,res)=>
 {
  orphan.getAll((err,result) =>   
  {
    if (err) return res.status(500).json({error:err.message});
    res.json(result);
  });
};
exports.getOrphanById=(req,res)=>{
  orphan.getById(req.params.id,(err,result)=>{
    if (err || result.length === 0) return res.status(404).json({message:'not found'});
    res.json(result[0]);
  });
};

exports.deleteOrphan = (req,res)=> {
  orphan.deleteById(req.params.id,(err)=>{
    if (err) return res.status(500).json({error:err.message});
    res.json({message:'orphan deleted'});
  });
};
exports.updateOrphan =(req,res)=> {
  const id=req.params.id;
  const updates=req.body;

  
  orphan.getById(id,(err,orphan)=>{
    if (err || orphan.length === 0){
      return res.status(404).json({message:'orphan not found'});
    }

    const current=orphan[0];

    const updatedData =[
      updates.name || current.name,
      updates.age || current.age,
      updates.education_status || current.education_status,
      updates.health_condition || current.health_condition
    ];

    orphan.updateById(id,updatedData,(err)=>{
      if(err) return res.status(500).json({error:err.message});
      res.json({message:'orphan updated successfully'});
    });
  });
};


exports.getOrphanDetails =(req,res)=>{
  const id=req.params.id;
  orphan.getById(id,(err,orphanData)=>{
    if (err || orphanData.length === 0) return res.status(404).json({message:'orphan not found'});

    sponsorship.getByOrphanId(id,(err,sponsors) =>{
      if (err) return res.status(500).json({error:err.message});

      OrphanUpdate.getByOrphanId(id,(err,updates)=>{
        if (err) return res.status(500).json({error:err.message});
        res.json({ ...orphanData[0],sponsors,updates});
      });
    });
  });
};

exports.sponsorOrphan=(req,res)=> {
  const {orphan_id,donation_model}=req.body;
  const user_id=req.user.id;

  sponsorship.create([orphan_id,user_id,donation_model],(err,result)=>{
    if (err) return res.status(500).json({error:err.message});
    res.status(201).json({message:'sponsorship created',id:result.insertId});
  });
};

exports.addOrphanUpdate =(req,res)=>{
  const {orphan_id,update_type,description}=req.body;
  OrphanUpdate.create([orphan_id,update_type,description],(err,result)=>{
    if(err) return res.status(500).json({error:err.message});
    res.status(201).json({message:'Update added',id:result.insertId });
  });
};
