const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  previousPrescriptions: [String],
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String,
  },
  allergies: [String],
  surgeriesProcedures: [String],
  previousIllnessesConditions: [String],
  appointmentHistory: {
    previousAppointments: [String],
    scheduledAppointments: [String],
    appointmentNotes: [String],
  },
  labTestResults: {
    recordOfLabTests: [String],
    testDates: [Date],
    results: [String],
    status: [String],
  },
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
