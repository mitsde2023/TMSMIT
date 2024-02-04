const express = require('express');
const Student = require('../models/Student');
const Employee = require('../models/Employee');
const Department = require('../models/Department');
const SubDepartment = require('../models/SubDepartment');
const router = express.Router();

router.post('/departments', async (req, res) => {
    try {
        const { DepartmentName, SubDepartments } = req.body;

        // Create Department
        const department = await Department.create({ DepartmentName });

        // Create associated SubDepartments
        if (SubDepartments && SubDepartments.length > 0) {
            await SubDepartment.bulkCreate(
                SubDepartments.map((subDept) => ({ ...subDept, DepartmentId: department.DepartmentID }))
            );
        }

        return res.status(201).json({ message: 'Department and SubDepartments created successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});





module.exports = router;
