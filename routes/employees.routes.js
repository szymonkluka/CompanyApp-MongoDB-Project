const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/employees.controllers');

router.get('/employees', EmployeeController.getAllEmployees);
router.get('/employees/random', EmployeeController.randomEmployee);
router.get('/employees/:id', EmployeeController.getEmployeeById);
router.post('/employees', EmployeeController.postEmployee);
router.put('/employees/:id', EmployeeController.updateEmployee);
router.delete('/employees/:id', EmployeeController.deleteEmployee);

module.exports = router;