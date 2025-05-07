const Org = require('../models/organizationModel');

exports.getAllOrganizations = (req, res) => {
  Org.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.verifyOrganization = (req, res) => {
  const { id } = req.params;
  Org.verify(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ msg: 'Organization verified' });
  });
};

exports.createOrganization = (req, res) => {
  const { name, address } = req.body;
  Org.create([name, address], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ msg: 'Organization created', id: result.insertId });
  });
};
