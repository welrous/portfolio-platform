const express = require('express');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const router = express.Router();

// Register route (POST)
router.post('/register', async (req, res) => {
  const { username, password, firstName, lastName, age, gender } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate 2FA secret
  const twoFactorSecret = speakeasy.generateSecret().base32;

  // Create the user
  const newUser = new User({
    username,
    password: hashedPassword,
    firstName,
    lastName,
    age,
    gender,
    twoFactorSecret, // Store the secret in the database
    twoFactorEnabled: false, // You can set this to true when enabling 2FA manually
  });

  await newUser.save();

  // Send welcome email (using Nodemailer)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-email-password',   // Replace with your email password
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: newUser.username, // Assuming the username is the user's email
    subject: 'Welcome to Our Platform!',
    text: `Hello ${newUser.firstName}, welcome to our platform! We're excited to have you with us.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.status(201).json({ message: 'User registered successfully!' });
});

// Login route (POST)
router.post('/login', async (req, res) => {
  const { username, password, twoFactorCode } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  // Compare password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ error: 'Incorrect password' });
  }

  // If 2FA is enabled, verify the code
  if (user.twoFactorEnabled) {
    const isTwoFactorCodeValid = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: twoFactorCode,
    });

    if (!isTwoFactorCodeValid) {
      return res.status(400).json({ error: 'Invalid 2FA code' });
    }
  }

  // Save user session (example)
  req.session.user = {
    username: user.username,
    role: user.role,
  };

  res.status(200).json({ message: 'Login successful', redirectTo: '/dashboard' });
});
// Register route
router.post('/register', async (req, res) => {
    const { username, password, firstName, lastName, age, gender } = req.body;
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Generate 2FA secret if enabled
    const twoFactorSecret = speakeasy.generateSecret().base32;
  
    // Create the user
    const newUser = new User({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      age,
      gender,
      twoFactorSecret, // Store the secret in the database
    });
  
    await newUser.save();
  
    // Send welcome email (using Nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user }})
  

module.exports = router;
