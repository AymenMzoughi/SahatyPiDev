const UserModel = require('../User/userModel');
const { MedicalRecord, MedicalImage } = require ('./Models');


const addMedicalRecord = async (req, res, next) => {
    try {
      const { patientId, doctorId, images } = req.body;

      // Nchouf ken el patient exist
      const existingPatient = await UserModel.findById(patientId);
      if (!existingPatient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      // Nchouf ken role = patient
      if (existingPatient.role !== "Patient") {
        return res.status(400).json({ error: 'User is not a patient' });
      }
  
      // Check if the medical record already exists
      let existingMedicalRecord = await MedicalRecord.findOne({ patientId });
      if (!existingMedicalRecord) {
        // Create a new medical record if it doesn't exist
        existingMedicalRecord = new MedicalRecord({ patientId, doctorId });
        await existingMedicalRecord.save();
      } else {
        // Update the doctor id of the existing medical record
        existingMedicalRecord.doctorId = doctorId;
        await existingMedicalRecord.save();
      }
  
      // Create an array of new medical images to be added
      const newMedicalImages = images.map((image) => ({
        doctorId,
        medicalRecordId: existingMedicalRecord._id,
        imageUrl: image.imageUrl,
        imageName: image.imageUrl.split('/').pop(),
        imageType: image.imageType,
      }));
  
      // Insert the new medical images
      const savedMedicalImages = await MedicalImage.insertMany(newMedicalImages);
  
      // Add the new medical images to the existing medical record
      existingMedicalRecord.medicalImages.push(...savedMedicalImages.map((image) => image._id));
      await existingMedicalRecord.save();
  
      res.json({
        medicalRecord: existingMedicalRecord,
        medicalImages: savedMedicalImages,
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  };
  


    
      

  module.exports = { addMedicalRecord};
