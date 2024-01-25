const express = require('express');
const cors = require('cors');
const sequelize = require('./config');
const Department = require('./models/Department')
const SubDepartment = require('./models/SubDepartment')
const Employee = require('./models/Employee')
const Student = require('./models/Student')
const Ticket = require('./models/Ticket');
const User = require('./models/User')
const UserTicket = require('./models/UserTicket')
const TicketResolution = require('./models/TicketResolution')

const app = express();
const port = 2000;

app.use(cors());


app.get('/get', async (req, res) => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        res.json({ response: "success", message: `Server running on port ${port}`, status: 200 });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(500).json({ response: "error", message: "Internal Server Error", status: 500 });
    }
});



// Create a new department
app.post('/departments', async (req, res) => {
    const { DepartmentName } = req.body;

    try {
        const department = await Department.create({ DepartmentName });
        res.status(201).json({ response: "success", data: department, status: 201 });
    } catch (error) {
        console.error('Error creating department:', error);
        res.status(500).json({ response: "error", message: "Internal Server Error", status: 500 });
    }
});

// Create a new sub-department
app.post('/subdepartments', async (req, res) => {
    const { SubDepartmentName, DepartmentID } = req.body;

    try {
        const subDepartment = await SubDepartment.create({ SubDepartmentName, DepartmentID });
        res.status(201).json({ response: "success", data: subDepartment, status: 201 });
    } catch (error) {
        console.error('Error creating sub-department:', error);
        res.status(500).json({ response: "error", message: "Internal Server Error", status: 500 });
    }
});

// Create a new employee
app.post('/employees', async (req, res) => {
    const { EmployeeName, DepartmentID, SubDepartmentID } = req.body;

    try {
        const employee = await Employee.create({ EmployeeName, DepartmentID, SubDepartmentID });
        res.status(201).json({ response: "success", data: employee, status: 201 });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ response: "error", message: "Internal Server Error", status: 500 });
    }
});

// Create a new student
app.post('/students', async (req, res) => {
    const { StudentName, Registration_No } = req.body;

    try {
        const student = await Student.create({ StudentName, Registration_No });
        res.status(201).json({ response: "success", data: student, status: 201 });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ response: "error", message: "Internal Server Error", status: 500 });
    }
});

// Create a new ticket
app.post('/tickets', async (req, res) => {
    const { UserID, Status, Description, Feedback, AssignedToDepartmentID, AssignedToSubDepartmentID, TransferredToDepartmentID, TransferredToSubDepartmentID } = req.body;

    try {
        const ticket = await Ticket.create({ UserID, Status, Description, Feedback, AssignedToDepartmentID, AssignedToSubDepartmentID, TransferredToDepartmentID, TransferredToSubDepartmentID });
        res.status(201).json({ response: "success", data: ticket, status: 201 });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ response: "error", message: "Internal Server Error", status: 500 });
    }
});

// Create a new user
app.post('/users', async (req, res) => {
    const { UserName, DepartmentID, SubDepartmentID } = req.body;

    try {
        const user = await User.create({ UserName, DepartmentID, SubDepartmentID });
        res.status(201).json({ response: "success", data: user, status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ response: "error", message: "Internal Server Error", status: 500 });
    }
});

// Create a new user ticket association
app.post('/usertickets', async (req, res) => {
    const { UserID, TicketID } = req.body;

    try {
        const userTicket = await UserTicket.create({ UserID, TicketID });
        res.status(201).json({ response: "success", data: userTicket, status: 201 });
    } catch (error) {
        console.error('Error creating user ticket association:', error);
        res.status(500).json({ response: "error", message: "Internal Server Error", status: 500 });
    }
});

// Create a new ticket resolution
app.post('/ticketresolutions', async (req, res) => {
    const { TicketID, ResolutionStatus, ResolutionDescription, ResolutionFeedback, ResolutionTimestamp } = req.body;

    try {
        const ticketResolution = await TicketResolution.create({ TicketID, ResolutionStatus, ResolutionDescription, ResolutionFeedback, ResolutionTimestamp });
        res.status(201).json({ response: "success", data: ticketResolution, status: 201 });
    } catch (error) {
        console.error('Error creating ticket resolution:', error);
        res.status(500).json({ response: "error", message: "Internal Server Error", status: 500 });
    }
});






sequelize.sync({ force: false }) // Set force to true to drop and re-create tables on every server restart (use with caution in production)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error syncing Sequelize models:', error);
    });
