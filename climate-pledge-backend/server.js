const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes (we'll implement these next)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pledges', require('./routes/pledges'));
app.use('/api/uploads', require('./routes/uploads'));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Climate Pledge API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));