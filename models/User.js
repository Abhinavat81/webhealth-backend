const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    // It's recommended to hash passwords before saving
    set: (value) => bcrypt.hashSync(value, bcrypt.genSaltSync(10)),
  },
  role: {
    type: String,
    required: true,
  },
  profilePicture: String,
  doctorLicenseNo: String,
  status: {
    type: Boolean,
    default: false, // Default status as false
  },
  phoneNo: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 120,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  speciality: [String],
  clinicAddress: {
    type: String,
    required: true,
  },
  qualification: [String],
  worksAtHospital: String,
  experience: Number,
  patientList: [{
    type: mongoose.Schema.Types.ObjectId,
  }],
},
{collection: 'User'},
);
// Middleware to hash password before saving
User.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  }
  next();
});
const UserData = mongoose.model('UserData', User);

module.exports = UserData;