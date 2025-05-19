const volunteer=require('../models/volunteerModel');
const request =require('../models/volunteerRequestModel');
const match =require('../models/volunteerMatchModel');

exports.registerVolunteer=(req,res) =>{
  const {service_type,availability}=req.body;
  const user_id=req.user.id;

  volunteer.create([user_id,service_type,availability],(err,result)=>{
    if (err) return res.status(500).json({error:err.message});
    res.status(201).json({message:'volunteer registered',id:result.insertId});
  });
};

exports.getVolunteers =(req,res)=>{
  volunteer.getAll((err,volunteers)=>{
    if (err) return res.status(500).json({error:err.message});
    res.json(volunteers);
  });
};

exports.createRequest=(req,res)=>{
  const { orphanage_name,request_type,details} =req.body;

  request.create([orphanage_name,request_type,details],(err,result)=> {
    if (err) return res.status(500).json({error:err.message});
    res.status(201).json({message:'request created',id:result.insertId});
  });
};

exports.getRequests =(req,res)=>{
  request.getAll((err,requests)=>{
    if (err) return res.status(500).json({error:err.message});
    res.json(requests);
  });
};

exports.matchVolunteer=(req,res)=> {
  const {volunteer_id,request_id}=req.body;

  match.create([volunteer_id,request_id,'pending'],(err,result)=>{
    if (err) return res.status(500).json({error:err.message});
    res.status(201).json({message:'match created',id:result.insertId});
  });
};

exports.getMatches=(req,res)=>{
  match.getAll((err,matches)=> {
    if (err) return res.status(500).json({error:err.message});
    res.json(matches);
  });
};
