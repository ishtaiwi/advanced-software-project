const Emergency = require('../models/emergencyModel');
const db =require('../config/db');
const nodemailer = require('nodemailer');

const transporter=nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:process.env.EMAIL_FROM,
    pass:process.env.EMAIL_PASS,
  },
});

exports.createCampaign =(req,res)=> {
  const{title,description,required_amount}=req.body;

  Emergency.createCampaign([title,description,required_amount],(err,result)=>{
    if (err) return res.status(500).json({error:err.message});

    Emergency.getAllDonors((err,donors)=>{
      if(err){
        console.error('Failed to get donors:',err.message);
        return res.status(500).json({msg:'campaign created but email failed'});
      }

      if (!donors.length)
      {
        return res.status(201).json({msg:'Campaign created but no donors found',
          id:result.insertId});
      }

      const emails =donors.map(d=>d.email);
      const mailOptions ={
        from:`"HopeConnect" <${process.env.EMAIL_FROM}>`,
        to:emails.join(','),
        subject:`🚨 Emergency Campaign:${title}`,
        text:`📢 A new emergency campaign has been launched.\n\n
        📝 Description: ${description}\n
        🎯 Goal: $${required_amount}\n\n
        Please consider supporting!`,
      };

      transporter.sendMail(mailOptions,(err,information) => {
        if (err){
          console.error('Email sending failed:',err.message);
        }else{
          console.log(`Email sent to: ${information.accepted.join(', ')}`);
        }
      });

      res.status(201).json({
        msg:'Campaign created and email notifications sent',
        id:result.insertId,
      });
    });
  });
};


exports.getCampaigns =(req,res)=>{
  Emergency.getAll((err,campaigns)=>{
    if (err) return res.status(500).json({error:err.message});
    res.json(campaigns);
  });
};
exports.donateToCampaign =(req,res) => {
  const {campaign_id,amount} = req.body;
  const user_id = req.user.id;

  Emergency.getById(campaign_id, (err,campaignData) => {
    if (err || !campaignData.length) {
      return res.status(404).json({msg:'campaign not found'});
    }

    const campaign = campaignData[0];
    const currentRaised = parseFloat(campaign.raised_amount);
    const requiredAmount = parseFloat(campaign.required_amount);
    const donationAmount = parseFloat(amount);

    if (currentRaised >= requiredAmount) {
      return res.status(400).json({ msg:'campaign funding goal already met'});
    }

    if (currentRaised + donationAmount > requiredAmount) {
      return res.status(400).json({msg:'donation exceeds required amount'});
    }

    Emergency.addDonation([campaign_id,user_id,donationAmount,'completed'], (err,result) => {
      if (err) return res.status(500).json({ error: err.message });

      Emergency.incrementRaisedAmount(campaign_id,donationAmount,(err2) => {
        if (err2) return res.status(500).json({ error:'donation saved but update failed'});

        Emergency.getById(campaign_id,(err3,updatedCampaignData) => {
          if (err3 || !updatedCampaignData.length) {
            return res.status(500).json({ msg: 'donation complete but unable to verify updated amount'});
          }

          const updatedCampaign = updatedCampaignData[0];
          const newRaised = parseFloat(updatedCampaign.raised_amount);
          const required = parseFloat(updatedCampaign.required_amount);

          if (newRaised >= required) {
            Emergency.updateStatus(campaign_id,'completed',(err4) => {
              if (err4) {
                return res.status(500).json({ msg:'Donation saved but failed to update campaign status' });
              }

              return res.status(201).json({
                msg:'Donation accepted. Campaign is now completed.',
                id:result.insertId,
              });
            });
          } else {
            return res.status(201).json({
              msg:'Donation accepted and campaign updated',
              id:result.insertId,
            });
          }
        });
      });
    });
  });
};
