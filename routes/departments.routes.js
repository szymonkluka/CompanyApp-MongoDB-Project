const express = require('express');
const router = express.Router();

const DepartmentController = require('../controllers/departments.controllers');

router.get('/departments', DepartmentController.getAllDepartments);

router.get('/departments/random', DepartmentController.getRandomDepartment);

router.get('/departments/:id', DepartmentController.getDepartmentById);

router.post('/departments', DepartmentController.postDepartment);

router.put('/departments/:id', DepartmentController.putDepartment);

router.delete('/departments/:id', DepartmentController.deleteDepartment);

module.exports = router;