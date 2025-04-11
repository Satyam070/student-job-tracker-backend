const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Add Job
router.post('/', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Jobs
router.get('/', async (req, res) => {
  try {
    const { status, sort } = req.query;
    let filter = {};
    if (status) filter.status = status;
    let jobs = await Job.find(filter).sort(sort ? { date: sort === 'asc' ? 1 : -1 } : {});
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Job Status
router.put('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Job
router.delete('/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
