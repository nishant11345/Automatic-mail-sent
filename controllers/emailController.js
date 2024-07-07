const Email = require('../models/Email');
const { scheduleEmail,cancelScheduledEmail } = require('../utils/emailScheduler');

exports.scheduleEmail = async (req, res) => {
    const { recipient, subject, body, scheduleTime } = req.body;
  
    try {
      const email = new Email({ recipient, subject, body, scheduleTime });
      await email.save();
      scheduleEmail(email);
  
      res.status(201).json({ message: 'Email scheduled successfully', email });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.getScheduledEmails = async (req, res) => {
  try {
    const emails = await Email.find();
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getScheduledEmail = async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (!email) return res.status(404).json({ message: 'Email not found' });

    res.status(200).json(email);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteScheduledEmail = async (req, res) => {
    try {
      const email = await Email.findById(req.params.id);
      if (!email) return res.status(404).json({ message: 'Email not found' });
  
      cancelScheduledEmail(req.params.id);
      await Email.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'Email canceled successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  