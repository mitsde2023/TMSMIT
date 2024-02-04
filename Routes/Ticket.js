

const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const TicketUpdate = require('../models/TicketUpdate');


app.post('/tickets', async (req, res) => {
    try {
      const ticketData = req.body;
  
      // Create ticket
      const createdTicket = await Ticket.create(ticketData
    //     , {
    //     include: [{ model: TicketUpdate, as: 'TicketUpdates' }],
    //   }
      );
  
      return res.status(201).json({ message: 'Ticket created successfully.', ticket: createdTicket });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;
