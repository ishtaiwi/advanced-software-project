const Orphan = require('../models/orphanModel');
const Sponsorship = require('../models/sponsorshipModel');
const OrphanUpdate = require('../models/orphanUpdateModel');

exports.createOrphan = (req, res) => {
  const { name, age, education_status, health_condition } = req.body;
  Orphan.create([name, age, education_status, health_condition], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Orphan created', id: result.insertId });
  });
};

exports.getAllOrphans = (req, res) => {
  Orphan.getAll((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

exports.getOrphanDetails = (req, res) => {
  const id = req.params.id;
  Orphan.getById(id, (err, orphanData) => {
    if (err || orphanData.length === 0) return res.status(404).json({ message: 'Not found' });

    Sponsorship.getByOrphanId(id, (err, sponsors) => {
      if (err) return res.status(500).json({ error: err.message });

      OrphanUpdate.getByOrphanId(id, (err, updates) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ ...orphanData[0], sponsors, updates });
      });
    });
  });
};

exports.sponsorOrphan = (req, res) => {
  const { orphan_id, donation_model } = req.body;
  const user_id = req.user.id;

  Sponsorship.create([orphan_id, user_id, donation_model], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Sponsorship created', id: result.insertId });
  });
};

exports.addOrphanUpdate = (req, res) => {
  const { orphan_id, update_type, description } = req.body;
  OrphanUpdate.create([orphan_id, update_type, description], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Update added', id: result.insertId });
  });
};
