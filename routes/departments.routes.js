const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/departments', (req, res) => {
  req.db.collection('departments').find().toArray((err, data) => {
    if (err) res.status(500).json({ message: err });
    else res.json(data);
  });
});

router.get('/departments/random', (req, res) => {
  req.db.collection('departments').aggregate([{ $sample: { size: 1 } }]).toArray((err, data) => {
    if (err) res.status(500).json({ message: err });
    else res.json(data[0]);
  });
});

router.get('/departments/:id', (req, res) => {
  try {
    const objectId = new ObjectId(req.params.id);
    req.db.collection('departments').findOne({ _id: objectId }, (err, data) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      if (!data) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.json(data);
    });
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/departments', (req, res) => {
  const { name } = req.body;
  req.db.collection('departments').insertOne({ name: name }, err => {
    if (err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  })
});

router.put('/departments/:id', async (req, res) => {
  const { name } = req.body;
  try {
    const objectId = new ObjectId(req.params.id);
    await req.db.collection('departments').updateOne({ _id: objectId }, { $set: { name } });
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
});

router.delete('/departments/:id', async (req, res) => {
  try {
    const objectId = new ObjectId(req.params.id);
    const result = await req.db.collection('departments').deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
});

module.exports = router;