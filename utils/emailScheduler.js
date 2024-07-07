const nodeCron = require('node-cron');
const nodemailer = require('nodemailer');
const Email = require('../models/Email');
const scheduledTasks = new Map();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nishant.work113@gmail.com',
      pass: 'dpjrgkhmqriowjqj'
    }
  });

  const scheduleEmail = (email) => {
    const time = new Date(email.scheduleTime);
    const cronExpression = `${time.getUTCMinutes()} ${time.getUTCHours()} ${time.getUTCDate()} ${time.getUTCMonth() + 1} *`;
  
    console.log(`Scheduling email to ${email.recipient} at ${time.toISOString()}`);
  
    const task = nodeCron.schedule(cronExpression, async () => {
      console.log(`Executing scheduled email to ${email.recipient} at ${new Date().toISOString()}`);
      try {
        await sendEmail(email);
        email.status = 'sent';
        await email.save();
        console.log(`Email sent to ${email.recipient}`);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    });
  
    scheduledTasks.set(email._id.toString(), task);
  };
  
  const sendEmail = async (email) => {
    const mailOptions = {
      from: 'nishant.work113@gmail.com',
      to: email.recipient,
      subject: email.subject,
      text: email.body
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email.recipient}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  const cancelScheduledEmail = (emailId) => {
    const task = scheduledTasks.get(emailId.toString());
    if (task) {
      task.stop();
      scheduledTasks.delete(emailId.toString());
      console.log('Email schedule canceled');
    } else {
      console.log('No scheduled task found for this email');
    }
  };
  
  module.exports = { scheduleEmail, cancelScheduledEmail };