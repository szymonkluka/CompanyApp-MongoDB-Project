const Employee = require('../models/employees.model');

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('department');
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.randomEmployee = async (req, res) => {
    try {
        const count = await Employee.countDocuments().populate('department');
        const rand = Math.floor(Math.random() * count);
        const dep = await Employee.findOne().populate('department').skip(rand);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};

exports.getEmployeeById = async (req, res) => {
    try {
        const dep = await Employee.findById(req.params.id).populate('department');
        if (!dep) {
            res.status(404).json({ message: 'Not found' });
        } else {
            res.json(dep);
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.postEmployee = async (req, res) => {
    try {
        const newEmployee = await Employee.create(req.body);
        await newEmployee.populate('department').execPopulate();
        res.json(newEmployee);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.postEmployee = async (req, res) => {
    try {
        const newEmployee = await Employee.create(req.body);
        await newEmployee.populate('department').execPopulate();
        res.json(newEmployee);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.updateEmployee = async (req, res) => {
    const { firstName, lastName, department } = req.body;

    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, { firstName, lastName, department }).populate('department');
        if (employee) {
            res.json({ message: 'OK', employee });
        } else {
            res.status(404).json({ message: 'Not found...' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const dep = await Employee.findById(req.params.id);
        if (dep) {
            const deletedDep = await Employee.findByIdAndDelete(req.params.id)
            res.json({ deletedDep });
        } else {
            res.status(404).json({ message: 'Not found...' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

