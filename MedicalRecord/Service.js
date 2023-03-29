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
  


    const deleteMedicalRecord = async (req, res, next) => {

       const medicalRecordId=req.params.id
        try {
            const existingMedicalRecord = await MedicalRecord.findById(medicalRecordId, '_id');
         
          console.log(req.params.id)
          if (!existingMedicalRecord) {
            return res.status(404).json({ error: 'Medical record not found' });
          }
      
          // Delete associated medical images
          await MedicalImage.deleteMany({ medicalRecordId });
      
          // Delete medical record
          await MedicalRecord.findByIdAndDelete(medicalRecordId);
      
          res.json({ message: 'Medical record deleted successfully' });
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
      };


      const deleteImageFromMedicalRecord = async (req, res, next) => {
        try {
          const { medicalImageId, doctorId } = req.params;
      
      
          // Find the medical image by ID
          const medicalImage = await MedicalImage.findById(medicalImageId);
          if (!medicalImage) {
            return res.status(404).json({ message: 'Invalid medical image ID' });
          }
      
          // Check if the doctor ID matches the one associated with the medical image
          if (medicalImage.doctorId.toString() !== doctorId.toString()) {
            return res.status(403).json({ message: 'The specified doctor did not add this image' });
          }
      
          // Delete the medical image
          await medicalImage.delete();
      
          res.json({ message: 'Medical image deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      };
      

  module.exports = { addMedicalRecord, deleteMedicalRecord, deleteImageFromMedicalRecord };
