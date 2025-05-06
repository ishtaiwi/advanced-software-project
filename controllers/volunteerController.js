const Volunteer = require('../models/volunteerModel');
const Request = require('../models/volunteerRequestModel');
const Match = require('../models/volunteerMatchModel');

exports.registerVolunteer = (req, res) => {
  const { service_type, availability } = req.body;
  const user_id = req.user.id;

  Volunteer.create([user_id, service_type, availability], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Volunteer registered', id: result.insertId });
  });
};

exports.getVolunteers = (req, res) => {
  Volunteer.getAll((err, volunteers) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(volunteers);
  });
};

exports.createRequest = (req, res) => {
  const { orphanage_name, request_type, details } = req.body;

  Request.create([orphanage_name, request_type, details], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Request created', id: result.insertId });
  });
};

exports.getRequests = (req, res) => {
  Request.getAll((err, requests) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(requests);
  });
};

exports.matchVolunteer = (req, res) => {
  const { volunteer_id, request_id } = req.body;

  Match.create([volunteer_id, request_id, 'pending'], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Match created', id: result.insertId });
  });
};

exports.getMatches = (req, res) => {
  Match.getAll((err, matches) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(matches);
  });
};
