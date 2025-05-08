const Delivery = require('../models/deliveryModel');

exports.createDelivery = (req, res) => {
  const { donation_id, current_location, delivery_status } = req.body;
  Delivery.create([donation_id, current_location, delivery_status], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ msg: 'Delivery created', id: result.insertId });
  });
};

exports.getAllDeliveries = (req, res) => {
  Delivery.getAll((err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
};

exports.getDeliveryById = (req, res) => {
  Delivery.getById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data[0]);
  });
};

exports.updateDelivery = (req, res) => {
  const { current_location, delivery_status } = req.body;
  Delivery.updateStatus(req.params.id, [current_location, delivery_status], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ msg: 'Delivery updated' });
  });
};

exports.deleteDelivery = (req, res) => {
  Delivery.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ msg: 'Delivery deleted' });
  });
};
