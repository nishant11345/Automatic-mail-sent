const express = require('express');
const mongoose = require('mongoose');
const emailRoutes = require('./routes/emailRoutes');

const app = express();
app.use(express.json());

app.use('/api', emailRoutes);

const MONGO_URI = 'mongodb+srv://ojhasumit0428:xiaMPSUj6Xmv5SVX@cluster0.f800cym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const PORT = 8000;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error(error));
