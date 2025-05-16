const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const generateToken =(user)=> {
  return jwt.sign({ id:user.id,role: user.role},
    process.env.JWT_SECRET,
    {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

exports.register =async(req,res) => {
  const { name,email,password, role } =req.body;

  User.findByEmail(email,async(err,users)=> {
    if (err) return res.status(500).json({error: err.message });
    if (users.length > 0) return res.status(400).json({ msg:'Email already in use'});

    const hashed =await bcrypt.hash(password,10);
    User.createUser([name, email, hashed, role || 'donor'], (err, result) => {
      if (err) return res.status(500).json({error: err.message });
      res.status(201).json({ msg:'User registered',id: result.insertId });
    });
  });
};

exports.login= (req,res)=> {
  const {email,password }= req.body;
  User.findByEmail(email,async (err,users)=> {
    if (err) return res.status(500).json({error:err.message});
    if (users.length === 0) return res.status(400).json({ msg: 'Invalid credentials'});

    const user =users[0];
    const match= await bcrypt.compare(password,user.password);

    if (!match) return res.status(400).json({ msg:'Invalid credentials'});
    const token =generateToken(user);
    res.json({ token,user: {id: user.id,name:user.name,role: user.role} });
  });
};
exports.getAllUsers = (req,res)=> {
  User.getAllUsers((err,users)=> {
    if (err) return res.status(500).json({error: err.message });
    res.json(users);
  });
}
exports.deleteUser= (req,res) => {
  const {id} = req.params;

  User.deleteUser(id,(err) => {
    if (err) return res.status(500).json({error: err.message});
    res.json({ msg:'User deleted'});
  });

 
};