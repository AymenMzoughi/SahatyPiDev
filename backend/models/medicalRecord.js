const mongoose = require('mongoose');
const { Schema } = mongoose;

const medicalImageSchema = new Schema({
  doctorId: { type: Schema.Types.ObjectId, ref: 'User'},
  medicalRecordId: { type: Schema.Types.ObjectId, ref: 'MedicalRecord' },
  imageUrl: { type: String },
  imageType: { type: String, enum: ['x-ray', 'medical letter', 'MRI', 'CT scan'] },
  imageName: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

const medicationSchema = new Schema({
  doctorId: { type: Schema.Types.ObjectId, ref: 'User' },
  medicalRecordId: { type: Schema.Types.ObjectId, ref: 'MedicalRecord' },
  name: { type: String },
  dosage: { type: String },
  frequency: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const treatmentSchema = new Schema({
  doctorId: { type: Schema.Types.ObjectId, ref: 'User' },
  medicalRecordId: { type: Schema.Types.ObjectId, ref: 'MedicalRecord' },
  name: { type: String },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const allergySchema = new Schema({
  doctorId: { type: Schema.Types.ObjectId, ref: 'User'},
  medicalRecordId: { type: Schema.Types.ObjectId, ref: 'MedicalRecord' },
  name: { type: String},
  severity: { type: String, enum: ['Mild', 'Moderate', 'Severe']},
  reaction: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const prescriptionSchema = new Schema({
  doctorId: { type: Schema.Types.ObjectId, ref: 'User' },
  medicalRecordId: { type: Schema.Types.ObjectId, ref: 'MedicalRecord' },
  description: { type: String },
  periode: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const medicalRecordSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  medications: [{ type: Schema.Types.ObjectId, ref: 'Medication' }],
  treatments: [{ type: Schema.Types.ObjectId, ref: 'Treatment' }],
  allergies: [{ type: Schema.Types.ObjectId, ref: 'Allergy' }],
  prescriptions: [{ type: Schema.Types.ObjectId, ref: 'Prescription' }],
  medicalImages: [{ type: Schema.Types.ObjectId, ref: 'MedicalImage' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});




medicalImageSchema.methods.delete = async function() {
  const medicalRecord = await MedicalRecord.findById(this.medicalRecordId);
  const index = medicalRecord.medicalImages.indexOf(this._id);
  if (index !== -1) {
    medicalRecord.medicalImages.splice(index, 1);
    await medicalRecord.save();
  }
  await this.deleteOne();
};

allergySchema.methods.delete = async function() {
  const medicalRecord = await MedicalRecord.findById(this.medicalRecordId);
  const index = medicalRecord.allergies.indexOf(this._id);
  if (index !== -1) {
    medicalRecord.allergies.splice(index, 1);
    await medicalRecord.save();
  }
  await this.deleteOne();
};

treatmentSchema.methods.delete = async function() {
  const medicalRecord = await MedicalRecord.findById(this.medicalRecordId);
  const index = medicalRecord.treatments.indexOf(this._id);
  if (index !== -1) {
    medicalRecord.treatments.splice(index, 1);
    await medicalRecord.save();
  }
  await this.deleteOne();
};

medicationSchema.methods.delete = async function() {
  const medicalRecord = await MedicalRecord.findById(this.medicalRecordId);
  const index = medicalRecord.medications.indexOf(this._id);
  if (index !== -1) {
    medicalRecord.medications.splice(index, 1);
    await medicalRecord.save();
  }
  await this.deleteOne();
};

prescriptionSchema.methods.delete = async function() {
  const medicalRecord = await MedicalRecord.findById(this.medicalRecordId);
  const index = medicalRecord.prescriptions.indexOf(this._id);
  if (index !== -1) {
    medicalRecord.prescriptions.splice(index, 1);
    await medicalRecord.save();
  }
  await this.deleteOne();
};

const MedicalImage = mongoose.model('MedicalImage', medicalImageSchema);
const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
const Medication = mongoose.model('Medication', medicationSchema);
const Treatment = mongoose.model('Treatment', treatmentSchema);
const Allergy = mongoose.model('Allergy', allergySchema);
const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = {
  MedicalImage,
  MedicalRecord,
  Medication,
  Treatment,
  Allergy,
  Prescription,
};
