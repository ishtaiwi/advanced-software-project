const Orphan = require('../models/orphanModel');
const Sponsorship = require('../models/sponsorshipModel');
const OrphanUpdate = require('../models/orphanUpdateModel');
const e = require('express');


exports.createOrphan = (req, res) => {
  const { name, age, education_status, health_condition } = req.body;

  Orphan.findByName(name, (err, existing) => {
    if (err) return res.status(500).json({ error: err.message });

    if (existing.length > 0) {
      return res.status(400).json({ msg: 'An orphan with this name already exists' });
    }

    Orphan.create([name, age, education_status, health_condition], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Orphan added successfully', id: result.insertId });
    });
  });
};

exports.getAllOrphans = (req, res) => {
  Orphan.getAll((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

exports.getOrphanById = (req, res) => {
  Orphan.getById(req.params.id, (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ message: 'Not found' });
    res.json(result[0]);
  });
};

exports.deleteOrphan = (req, res) => {
  Orphan.deleteById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Orphan deleted' });
  });
};
exports.updateOrphan = (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  
  Orphan.getById(id, (err, orphan) => {
    if (err || orphan.length === 0) {
      return res.status(404).json({ message: 'Orphan not found' });
    }

    const current = orphan[0];

    const updatedData = [
      updates.name || current.name,
      updates.age || current.age,
      updates.education_status || current.education_status,
      updates.health_condition || current.health_condition
    ];

    Orphan.updateById(id, updatedData, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Orphan updated successfully' });
    });
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
