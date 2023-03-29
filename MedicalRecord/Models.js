const mongoose = require('mongoose');
const { Schema } = mongoose;

const medicalImageSchema = new Schema({
  doctorId: { type: Schema.Types.ObjectId, ref: 'user', required: true},
  medicalRecordId: { type: Schema.Types.ObjectId, ref: 'MedicalRecord', required: true },
  imageUrl: { type: String, required: true },
  imageType: { type: String, enum: ['x-ray', 'prescription', 'medical letter'], required: true },
  imageName:{ type: String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const medicalRecordSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
  medicalImages: [{ type: Schema.Types.ObjectId, ref: 'MedicalImage' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});



const MedicalImage = mongoose.model('MedicalImage', medicalImageSchema);
const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

module.exports = {
  MedicalImage,
  MedicalRecord,
};