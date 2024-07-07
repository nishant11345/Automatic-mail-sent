const express = require('express');
const mongoose = require('mongoose');
const emailRoutes = require('./routes/emailRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api', emailRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch((error) => console.error(error));