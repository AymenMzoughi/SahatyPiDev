const UserModel = require('../User/userModel');
const { MedicalRecord, MedicalImage } = require ('./Models');


    const addMedicalRecord = async (req, res, next) => {
      try {
        const { patientId, doctorId, imageType } = req.body;
        const images = req.files;

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
          imageUrl: image.path,
          imageName: image.filename,
          imageType: imageType,
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
      

      const getAllMedicalRecords = async (req, res, next) => {
        try {
          // Find all medical records and populate the patientId field with the corresponding patient document
          const medicalRecords = await MedicalRecord.find().populate('patientId');
      
          // Find all medical images associated with the medical records
          const medicalImages = await MedicalImage.find({ medicalRecordId: { $in: medicalRecords.map(record => record._id) } });
      
          // Group the medical images by medical record ID
          const medicalImagesByRecordId = medicalImages.reduce((acc, image) => {
            acc[image.medicalRecordId] = acc[image.medicalRecordId] || [];
            acc[image.medicalRecordId].push(image);
            return acc;
          }, {});
      
          // Combine the medical records with their associated medical images
          const medicalRecordsWithImages = medicalRecords.map(record => {
            const images = medicalImagesByRecordId[record._id] || [];
            return { 
              _id: record._id,
              patientName: `${record.patientId.firstname} ${record.patientId.lastname}`,
              medicalImages: images 
            };
          });
      
          res.json(medicalRecordsWithImages);
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
      };
      

  module.exports = { addMedicalRecord, deleteMedicalRecord, deleteImageFromMedicalRecord, getAllMedicalRecords};
