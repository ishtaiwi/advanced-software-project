const Donation = require('../models/donationModel');

exports.createDonation = (req, res) => {
  const { amount, category, payment_status, payment_method } = req.body;
  const user_id = req.user.id;
  
  Donation.create([user_id, amount, category, payment_status, payment_method], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Donation recorded', id: result.insertId });
  });
};

exports.getMyDonations = (req, res) => {
  const user_id = req.user.id;

  Donation.getByUserId(user_id, (err, donations) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(donations);
  });
};

exports.getAllDonations = (req, res) => {
  Donation.getAll((err, donations) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(donations);
  });
};

exports.updateDonation = (req, res) => {
  const { amount, category, payment_status, payment_method } = req.body;
  const donationId = req.params.id;

  Donation.updateById(donationId, [amount, category, payment_status, payment_method], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Donation updated' });
  });
};

exports.deleteDonation = (req, res) => {
  const donationId = req.params.id;

  Donation.deleteById(donationId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Donation deleted' });
  });
};
