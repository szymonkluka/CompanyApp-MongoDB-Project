// post.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db');
const ObjectId = require('mongodb').ObjectId

router.get('/products', (req, res) => {
  req.db.collection('products').find().toArray((err, data) => {
    if (err) res.status(500).json({ message: err })
    else res.json(data);
  }
  )
});

router.get('/products/random', (req, res) => {
  req.db.collection('products').aggregate([{ $sample: { size: 1 } }]).toArray((err, data) => {
    if (err) res.status(500).json({ message: err })
    else res.json(data[0]);
  }
  )
}
);

router.get('/products/:id', (req, res) => {
  try {
    const objectId = new ObjectId(req.params.id);
    req.db.collection('products').findOne({ _id: objectId }, (err, data) => {
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

router.post('/products', (req, res) => {
  const { name, client } = req.body;
  req.db.collection('products').insertOne(({ name: name, client: client }), err => {
    if (err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  }
  )
});

router.put('/products/:id', async (req, res) => {
  const { name, client } = req.body;
  try {
    const objectId = new ObjectId(req.params.id);
    await req.db.collection('products').updateOne({ _id: objectId }, { $set: { name, client } });
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const objectId = new ObjectId(req.params.id);
    const result = await req.db.collection('products').deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
});

module.exports = router;
