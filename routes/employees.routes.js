const express = require('express');
const router = express.Router();
const db = require('./../db');
const ObjectId = require('mongodb').ObjectId

router.get('/employees', (req, res) => {
  req.db.collection('employees').find().toArray((err, data) => {
    if (err) res.status(500).json({ message: err })
    else (res.json(data))
  });
});

router.get('/employees/random', (req, res) => {
  req.db.collection('employees').aggregate([{ $sample: { size: 1 } }]).toArray((err, data) => {
    if (err) res.status(500).json({ message: err });
    else res.json(data[0]);
  })
});


router.get('/employees/:id', (req, res) => {
  try {
    const objectId = new ObjectId(req.params.id);
    req.db.collection('employees').findOne({ _id: objectId }, (err, data) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      if (!data) {
        return res.status(404).json({ message: 'NotFound' });
      }
      res.json(data);
    });
  } catch (error) {
    res.status(404).json({ message: 'NotFound' });
  }
});

router.post('/employees', (req, res) => {
  const { firstName, lastName, department } = req.body;
  req.db.collection('employees').insertOne({ firstName: firstName, lastName: lastName, department: department }, err => {
    if (err) res.status(500).json({ message: err })
    else res.json({ message: 'OK' })
  })
});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, department } = req.body;
  try {
    const objectId = new ObjectId(req.params.id);
    await req.db.collection('employees').updateOne({ _id: objectId }, { $set: { firstName, lastName, department } });
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
});

router.delete('/employees/:id', async (req, res) => {
  try {
    const objectId = new ObjectId(req.params.id);
    const result = await req.db.collection('employees').deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
});


module.exports = router;
