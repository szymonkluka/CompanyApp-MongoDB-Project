const Product = require('../models/products.model');

exports.getAllProducts = async (req, res) => {
    try {
        res.json(await Product.find());
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.getRandomProduct = async (req, res) => {
    try {
        const count = await Product.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const dep = await Product.findOne().skip(rand);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const dep = await Product.findById(req.params.id);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.postProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}

exports.updateProduct = async (req, res) => {
    const { name, client } = req.body

    try {
        const products = await Product.findByIdAndUpdate(req.params.id, { name, client })
        if (products) {
            res.json({ message: 'OK' })
        }
        else {
            res.status(404).json({ message: 'Not found' })
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const products = await Product.findByIdAndDelete(req.params.id)
        if (products) {
            res.json({ message: 'OK' })
        }
        else {
            res.status(404).json({ message: 'Not found' })
        }
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}