const Emergency = require('../models/emergencyModel');
const db = require('../config/db');
const nodemailer = require('nodemailer');

exports.createCampaign = (req, res) => {
  const { title, description, required_amount } = req.body;

  Emergency.createCampaign([title, description, required_amount], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    // Get all donor emails
    Emergency.getAllDonors((err, donors) => {
      if (err) return res.status(500).json({ message: 'Campaign created, but failed to fetch donors.' });

      const emails = donors.map(d => d.email);
      if (emails.length === 0) return res.status(201).json({ msg: 'Campaign created, no donors to notify.' });

      // Send notification email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: `"HopeConnect" <${process.env.EMAIL_FROM}>`,
        to: emails.join(','),
        subject: `🚨 New Emergency Campaign: ${title}`,
        text: `${description}\n\nTarget Amount: $${required_amount}`
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error('Email error:', err);
        else console.log('Emails sent:', info.accepted);
      });

      res.status(201).json({ msg: 'Campaign created and donors notified', id: result.insertId });
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
