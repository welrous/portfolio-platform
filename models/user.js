const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');

// Create a User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor'], default: 'editor' }, // Roles: admin, editor
  twoFactorSecret: String, // Store the secret for 2FA setup
  twoFactorEnabled: { type: Boolean, default: false }, // Track if 2FA is enabled for the user
});

// Method to compare the password
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password); // Compare provided password with the hashed one
};

// Pre-save hook to hash password before saving to the database
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // Hash password with bcrypt
  }
  next();
});

// Export the model
const User = mongoose.model('User', userSchema);

module.exports = User;
