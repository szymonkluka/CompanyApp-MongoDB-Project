//departments.controller.js trzeba zrobić zwracanie danych po zmianie tak jak 

const Department = require('../models/department.model');

exports.getAllDepartments = async (req, res) => {
    try {
        res.json(await Department.find({}));
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandomDepartment = async (req, res) => {

    try {
        const count = await Department.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const dep = await Department.findOne().skip(rand);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getDepartmentById = async (req, res) => {

    try {
        const dep = await Department.findById(req.params.id);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};

exports.postDepartment = async (req, res) => {

    try {
        const { name } = req.body;
        const newDepartment = new Department({ name: name });
        await newDepartment.save();
        res.json({ message: 'OK' });

    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.putDepartment = async (req, res) => {
    const { name } = req.body;

    try {
        const dep = await Department.findById(req.params.id);
        if (dep) {
            const updatedDep = await Department.findByIdAndUpdate(req.params.id, { name: name }, { new: true });
            res.json(updatedDep);
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.deleteDepartment = async (req, res) => {

    try {
        const dep = await Department.findById(req.params.id);
        if (dep) {
            const deletedDep = await Department.findByIdAndDelete(req.params.id);
            res.json({ deletedDep });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}