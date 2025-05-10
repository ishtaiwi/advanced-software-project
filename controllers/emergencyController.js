const Emergency = require('../models/emergencyModel');
const db = require('../config/db');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

exports.createCampaign = (req, res) => {
  const { title, description, required_amount } = req.body;

  Emergency.createCampaign([title, description, required_amount], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    Emergency.getAllDonors((err, donors) => {
      if (err) {
        console.error('Failed to get donors:', err.message);
        return res.status(500).json({ msg: 'Campaign created, but email failed' });
      }

      if (!donors.length) {
        return res.status(201).json({ msg: 'Campaign created, but no donors found', id: result.insertId });
      }

      const emails = donors.map(d => d.email);
      const mailOptions = {
        from: `"HopeConnect" <${process.env.EMAIL_FROM}>`,
        to: emails.join(','),
        subject: `🚨 Emergency Campaign: ${title}`,
        text: `📢 A new emergency campaign has been launched.\n\n📝 Description: ${description}\n🎯 Goal: $${required_amount}\n\nPlease consider supporting!`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('Email sending failed:', err.message);
        } else {
          console.log(`Email sent to: ${info.accepted.join(', ')}`);
        }
      });

      res.status(201).json({
        msg: 'Campaign created and email notifications sent.',
        id: result.insertId,
      });
    });
  });
};


exports.getCampaigns = (req, res) => {
  Emergency.getAll((err, campaigns) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(campaigns);
  });
};

exports.donateToCampaign = (req, res) => {
  const { campaign_id, amount } = req.body;
  const user_id = req.user.id;

  Emergency.addDonation([campaign_id, user_id, amount, 'completed'], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ msg: 'Donation received', id: result.insertId });
  });
};
