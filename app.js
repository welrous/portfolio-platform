require('dotenv').config();
const express = require('express');
const connectDB = require('./server/config/db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB().catch((err) => {
  console.error("Error connecting to the database", err);
  process.exit(1);
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Main Route (Root)
app.get('/', (req, res) => {
  res.render('index', { title: 'My Portfolio' });
});

// Routes for Editor and Admin
app.use('/editor', require('./server/routes/editor')); // Editor functionalities at /editor
app.use('/admin', require('./server/routes/admin'));   // Admin functionalities at /admin
app.use('/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
