const mongoose = require("mongoose");
const { Schema } = mongoose;

const medicalImageSchema = new Schema(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    medicalRecordId: {
      type: Schema.Types.ObjectId,
      ref: "MedicalRecord",
      required: true,
    },
    imageUrl: { type: String, required: true },
    imageType: {
      type: String,
      enum: ["x-ray", "prescription", "medical letter"],
      required: true,
    },
    imageName: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const medicationSchema = new Schema({
  doctorId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  medicalRecordId: {
    type: Schema.Types.ObjectId,
    ref: "MedicalRecord",
    required: true,
  },
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
});

const treatmentSchema = new Schema({
  doctorId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  medicalRecordId: {
    type: Schema.Types.ObjectId,
    ref: "MedicalRecord",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
});

const allergySchema = new Schema({
  doctorId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  medicalRecordId: {
    type: Schema.Types.ObjectId,
    ref: "MedicalRecord",
    required: true,
  },
  name: { type: String, required: true },
  severity: {
    type: String,
    enum: ["mild", "moderate", "severe"],
    required: true,
  },
  reaction: { type: String, required: true },
});

const medicalRecordSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
  medications: [{ type: Schema.Types.ObjectId, ref: "Medication" }],
  treatments: [{ type: Schema.Types.ObjectId, ref: "Treatment" }],
  allergies: [{ type: Schema.Types.ObjectId, ref: "Allergy" }],
  medicalImages: [{ type: Schema.Types.ObjectId, ref: "MedicalImage" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

medicalImageSchema.methods.delete = async function () {
  const medicalRecord = await MedicalRecord.findById(this.medicalRecordId);
  const index = medicalRecord.medicalImages.indexOf(this._id);
  if (index !== -1) {
    medicalRecord.medicalImages.splice(index, 1);
    await medicalRecord.save();
  }
  await this.deleteOne();
};

allergySchema.methods.delete = async function () {
  const medicalRecord = await MedicalRecord.findById(this.medicalRecordId);
  const index = medicalRecord.allergies.indexOf(this._id);
  if (index !== -1) {
    medicalRecord.allergies.splice(index, 1);
    await medicalRecord.save();
  }
  await this.deleteOne();
};

treatmentSchema.methods.delete = async function () {
  const medicalRecord = await MedicalRecord.findById(this.medicalRecordId);
  const index = medicalRecord.treatments.indexOf(this._id);
  if (index !== -1) {
    medicalRecord.treatments.splice(index, 1);
    await medicalRecord.save();
  }
  await this.deleteOne();
};

medicationSchema.methods.delete = async function () {
  const medicalRecord = await MedicalRecord.findById(this.medicalRecordId);
  const index = medicalRecord.medications.indexOf(this._id);
  if (index !== -1) {
    medicalRecord.medications.splice(index, 1);
    await medicalRecord.save();
  }
  await this.deleteOne();
};

const MedicalImage = mongoose.model("MedicalImage", medicalImageSchema);
const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
const Medication = mongoose.model("Medication", medicationSchema);
const Treatment = mongoose.model("Treatment", treatmentSchema);
const Allergy = mongoose.model("Allergy", allergySchema);

module.exports = {
  MedicalImage,
  MedicalRecord,
  Medication,
  Treatment,
  Allergy,
};
