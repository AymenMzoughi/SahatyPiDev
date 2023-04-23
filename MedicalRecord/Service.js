const UserModel = require('../User/userModel');
const { MedicalRecord, MedicalImage, Medication, Allergy, Treatment, Log } = require ('./Models');
const winston = require('winston');
const mongoose = require('mongoose');
require('winston-mongodb');
const fs = require('fs');
const path = require('path');


const nodemailer = require('nodemailer');


// const nexmo = require('nexmo');
// const nexmoClient = new nexmo({
//   apiKey: 'bacff00c',
//   apiSecret: '5BR0vcpGpo5mc2JC',
// });

const nexmo = require('nexmo');
const { Console } = require('console');
const nexmoClient = new nexmo({
  apiKey: '1cfff73c',
  apiSecret: 'pIV2CDT582lZhx9N',
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "getawayvoy.services@gmail.com",
    pass: "byoxgpbbfanfopju",
  },
});


const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format((info, { req }) => {
      const { patientId, doctorId, medicalRecordId } = info.meta || {};
      info.meta = {
        doctorId: req?.body?.doctorId,
      };
      return info;
    })({ req: null }),
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/MedicalRecords/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/MedicalRecords/combined.log', level: 'info' , levelOnly: true }),
    new winston.transports.MongoDB({
      level: 'info',
      db: mongoose.connection,
      options: { useUnifiedTopology: true },
      collection: 'medical_logs',
      metaKey: 'meta',
      transformer: (log) => {
        const { patientId, doctorId, medicalRecordId, sysdate } = log.meta || {};
        return {
          ...log,
          doctorId,
          medicalRecordId,
          patientId,
          sysdate,
        };
      },
    }),
  ],
})


const sendMail = async (to, subject, html) => {
  const mailOptions = {
    from: 'getawayvoy.services@gmail.com',
    to,
    subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};


 // Add function for Medical Image
 const addMedicalImage = async (doctorId, medicalRecordId, image, imageType, imageName) => {
  try {
  const medicalImage = new MedicalImage({
  doctorId,
  medicalRecordId,
  imageUrl: image,
  imageType,
  imageName,
  });
  await medicalImage.save();
  logger.info('Medical Image added successfully', {
  timestamp: new Date().toISOString(),
  doctorId,
  medicalRecordId,
  imageUrl: path,
  imageType,
  imageName,
  });
  return medicalImage;
  } catch (error) {
  // Log error
  logger.error('Failed to add Medical Image', {
  timestamp: new Date().toISOString(),
  doctorId,
  medicalRecordId,
  imageUrl: image,
  imageType,
  imageName,
  error: error.message,
  });
  throw error;
  }
  };

// Add function for Medication
const addMedication = async (doctorId,medicalRecordId, name, dosage, frequency) => {
  try {
  const medication = new Medication({
    doctorId,
    medicalRecordId,
    name,
    dosage,
    frequency,
  });
  await medication.save();
  logger.info('Medication added successfully', {
    timestamp: new Date().toISOString(),
    doctorId,
    medicalRecordId,
    name,
    dosage,
    frequency,
  });
  return medication;
} catch (error) {
  // Log error
  logger.error('Failed to add Medication', {
    timestamp: new Date().toISOString(),
    doctorId,
    medicalRecordId,
    name,
    dosage,
    frequency,
    error: error.message,
  });
  throw error;
}
};


// Add function for Treatment
const addTreatment = async (doctorId,medicalRecordId,  name, description, startDate, endDate) => {
  try {
  const treatment = new Treatment({
    doctorId,
    medicalRecordId,
    name,
    description,
    startDate,
    endDate,
  });
  await treatment.save();
  logger.info('Treatment added successfully', {
    timestamp: new Date().toISOString(),
    doctorId,
    medicalRecordId,
    name,
    description,
    startDate,
    endDate,
  });
  return treatment;
} catch (error) {
  // Log error
  logger.error('Failed to add Treatment', {
    timestamp: new Date().toISOString(),
    doctorId,
    medicalRecordId,
    name,
    description,
    startDate,
    endDate,
    error: error.message,
  });
  throw error;
}
};

// Add function for Allergy
const addAllergy = async (doctorId,medicalRecordId, name, severity, reaction) => {
  try {
  const allergy = new Allergy({
    doctorId,
    medicalRecordId,
    name,
    severity,
    reaction,
  });
  await allergy.save();
  logger.info('Allergy added successfully', {
    timestamp: new Date().toISOString(),
    doctorId,
    medicalRecordId,
    name,
    severity,
    reaction,
  });
  return allergy;
} catch (error) {
  // Log error
  logger.error('Failed to add Allergy', {
    timestamp: new Date().toISOString(),
    doctorId,
    medicalRecordId,
    name,
    severity,
    reaction,
    error: error.message,
  });
  throw error;
}
};

// Add function for Medical Record
const addMedicalRecord = async (req, res, next) => {
  try {
    const { patientId, doctorId, imageType,medications,treatments,allergies} = req.body;
    const images = req.files;

    const parsedMedications = JSON.parse(medications);
    const parsedTreatments = JSON.parse(treatments);
    const parsedAllegries = JSON.parse(allergies);

    
    // Check if the doctorId refers to a user with role doctor/admin
    const doctor = await UserModel.findOne({ _id: doctorId, $or: [{ role: 'Docteur' }, { role: 'admin' }] });
    if (!doctor) {
      logger.info(`The user with id ${doctorId} is trying to add/update a medical record`, {
        timestamp: new Date().toISOString(),
      });
      return res.status(403).json({ error: 'Unauthorized' });
    }
    // Check if the medical record already exists
    let existingMedicalRecord = await MedicalRecord.findOne({ patientId });
    
    if (!existingMedicalRecord) {
      // Create a new medical record if it doesn't exist
      existingMedicalRecord = new MedicalRecord({ patientId, doctorId });
      await existingMedicalRecord.save();
      logger.info(`The user with id ${doctorId} created a new medical record for patient with id ${patientId}`, {
        timestamp: new Date().toISOString(),
      });
      
    } else {
      // Update the doctor id of the existing medical record
      existingMedicalRecord.doctorId = doctorId;
      await existingMedicalRecord.save();
      logger.info(`The user with id ${doctorId} updated an existing medical record for patient with id ${patientId}`, {
        timestamp: new Date().toISOString(),
      });
    }

    // Call add functions for other models
    if (Array.isArray(parsedMedications)) {
      const medicationPromises = parsedMedications.map(medication =>
        addMedication(doctorId, existingMedicalRecord._id, medication.name, medication.dosage, medication.frequency)
      );
      const savedMedications = await Promise.all(medicationPromises);
      existingMedicalRecord.medications.push(...savedMedications.map(medication => medication._id));
      console.log('Medication',savedMedications)
    }

    if (Array.isArray(parsedTreatments)) {
      const treatmentPromises = parsedTreatments.map(treatment =>
        addTreatment(doctorId, existingMedicalRecord._id, treatment.name, treatment.description, treatment.startDate,treatment.endDate)
      );
      const savedTreatments = await Promise.all(treatmentPromises);
      existingMedicalRecord.treatments.push(...savedTreatments.map(treatment => treatment._id));
      console.log('Treatement',savedTreatments)
    }

    if (Array.isArray(parsedAllegries)) {
      const allergyPromises = parsedAllegries.map(allergy =>
        addAllergy(doctorId, existingMedicalRecord._id,allergy.name, allergy.severity, allergy.reaction)
      );
      const savedAllergies = await Promise.all(allergyPromises);
      existingMedicalRecord.allergies.push(...savedAllergies.map(allergy => allergy._id));
      console.log('Allergies',savedAllergies)
    }

    console.log(images)
    if (images && images.length > 0) {
      const medicalImagePromises = images.map(async (medicalImage) => {
        const filename = medicalImage.filename;
        const path = medicalImage.path;
        console.log(req.body.imageType);
        const savedMedicalImage = await addMedicalImage(doctorId, existingMedicalRecord._id, path, req.body.imageType, filename);
        return savedMedicalImage;
      });
    
      const savedMedicalImages = await Promise.all(medicalImagePromises);
      existingMedicalRecord.medicalImages.push(...savedMedicalImages.map(medicalImage => medicalImage._id));
    }
    
   

    await existingMedicalRecord.save();
    
        const user = await UserModel.findOne({ _id: patientId }).select('mail numero lastname firstname');
        const doctorName = await UserModel.findOne({ _id: doctorId }).select('lastname firstname');
        
 // Send email notification
    const subject = 'New Medical Record Added';
    const html = `
    <html>
    <body>
        <p>&nbsp;</p>
        <p><img style="float: left;" src="https://i.imgur.com/nIyZjOx.png" width="147" height="147" /></p>
        <h4 style="margin: 0px; text-size-adjust: none; font-family: arial, 'helvetica neue', helvetica, sans-serif; line-height: 28px; color: #0a4898; font-size: 14px; text-align: center;"><span style="color: #000000;"><em>Dear ${user.lastname} ${user.firstname},</em></span></h4>
        <p style="margin: 0px; text-size-adjust: none; font-family: arial, 'helvetica neue', helvetica, sans-serif; line-height: 28px; color: #0a4898; font-size: 14px; text-align: center;"><span style="color: #000000;"><em>We are pleased to inform you that your medical record number <span style="text-decoration: underline;">" ${existingMedicalRecord._id} "</span> has been updated by </em></span></p>
        <p style="margin: 0px; text-size-adjust: none; font-family: arial, 'helvetica neue', helvetica, sans-serif; line-height: 28px; color: #0a4898; font-size: 14px; text-align: center;"><span style="color: #00ccff;"><strong><span style="text-decoration: underline;"><em>Dr. ${doctorName.lastname} ${doctorName.firstname}</em></span></strong></span></p>
        <p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: arial, 'helvetica neue', helvetica, sans-serif; line-height: 28px; color: #0a4898; font-size: 14px; text-align: left;">&nbsp;</p>
        <p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: arial, 'helvetica neue', helvetica, sans-serif; line-height: 28px; color: #0a4898; font-size: 14px; text-align: left;">&nbsp;</p>
        <p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: arial, 'helvetica neue', helvetica, sans-serif; line-height: 28px; color: #0a4898; font-size: 14px; text-align: left;"><span style="color: #000000;"><em>For this our team has reviewed and found this list of updates:</em></span></p>
        <ul style="list-style-type: circle;">
        <li><span style="color: #000000;"><em>Files: 1 image of type ${req.body.imageType || 'N/A'} </em></span></li>
        <li><span style="color: #000000;"><em>Medication: ${parsedMedications.length || 'N/A'} </em></span></li>
         <li><span style="color: #000000;"><em>Treatment: ${parsedTreatments.length || 'N/A'} </em></span></li>
         <li><span style="color: #000000;"><em>Allergies: ${parsedAllegries.length || 'N/A'} </em></span></li>
        </ul>
        <p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: arial, 'helvetica neue', helvetica, sans-serif; line-height: 28px; color: #0a4898; font-size: 14px; text-align: left;"><span style="color: #000000;"><em>Please login to your account to view more details about your medical record</em></span></p>
        <p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: arial, 'helvetica neue', helvetica, sans-serif; line-height: 28px; color: #0a4898; font-size: 14px; text-align: left;"><span style="color: #000000;"><em>Thank you for choosing our services.</em></span></p>
        <p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: arial, 'helvetica neue', helvetica, sans-serif; line-height: 28px; color: #0a4898; font-size: 14px; text-align: left;"><span style="color: #000000;"><em>Sincerely, Sehaty Team</em></span></p>
    </body>
    </html>
  
    `;
    await sendMail(user.mail, subject, html);

     // Send SMS notification
    const message = await nexmoClient.message.sendSms(
      'Vonage APIs', // Replace with the Nexmo virtual number you purchased
      21655736345,
      `Dear ${user.lastname} ${user.firstname}, 
      We are pleased to inform you that your medical record number ${existingMedicalRecord._id} has been updated by Dr. ${doctorName.lastname} ${doctorName.firstname}. 
      Please login to your account to view more details. Thank you for choosing our services.
      Sincerely, Sehaty Team`,
      { type: 'unicode' },
      (err, responseData) => {
        if (err) {
          logger.error('Error sending SMS', { error: err });
          return;
        }
        logger.info('SMS sent successfully', { responseData });
      }
    );

    res.json({
      medicalRecord: existingMedicalRecord,
    });
  } catch (err) {
    logger.error(err, {
      message:(err),
      timestamp: new Date().toISOString(),
    });
    res.status(500).send('Internal Server Error');
  }
};


const deleteMedicalRecord = async (req, res, next) => {
  const medicalRecordId = req.params.id;

  try {
    const existingMedicalRecord = await MedicalRecord.findById(medicalRecordId, '_id');

    if (!existingMedicalRecord) {
      return res.status(404).json({ error: 'Medical record not found' });
    }

    await MedicalImage.deleteMany({ medicalRecordId });
    await Allergy.deleteMany({medicalRecordId});
    await Medication.deleteMany({medicalRecordId});
    await Treatment.deleteMany({medicalRecordId});
    await MedicalRecord.findByIdAndDelete(medicalRecordId);

    logger.info('Medical record deleted successfully', {
      timestamp: new Date().toISOString(),
      medicalRecordId,
    });

    res.json({ message: 'Medical record deleted successfully' });
  } catch (err) {
    logger.error(err, {
      timestamp: new Date().toISOString(),
      medicalRecordId,
    });
    res.status(500).send('Internal Server Error');
  }
};

const deleteImageFromMedicalRecord = async (req, res, next) => {
  try {
    const { medicalImageId, doctorId } = req.params;

    const medicalImage = await MedicalImage.findById(medicalImageId);
    
    if (!medicalImage) {
      return res.status(404).json({ message: 'Invalid medical image ID' });
    }

    if (medicalImage.doctorId.toString() !== doctorId.toString()) {
      logger.warn('The specified doctor tried to delete the file', {
        timestamp: new Date().toISOString(),
        medicalImageId,
        doctorId,
      });
      return res.status(403).json({ message: 'The specified doctor did not add this image' });
    }

    await medicalImage.delete();

    logger.info('Medical image deleted successfully', {
      timestamp: new Date().toISOString(),
      doctorId,
      medicalImageId,
    });

    res.json({ message: 'Medical image deleted successfully' });
  } catch (error) {
    logger.error(error, {
      timestamp: new Date().toISOString(),
    });
    res.status(500).send('Internal Server Error');
  }
};


const deleteAllergyFromMedicalRecord = async (req, res, next) => {
  try {
    const { allergyId, doctorId } = req.params;

    const allergy = await Allergy.findById(allergyId);

    if (!allergy) {
      return res.status(404).json({ message: 'Invalid allergy ID' });
    }

    if (allergy.doctorId.toString() !== doctorId.toString()) {
      logger.warn('The specified doctor tried to delete the allergy', {
        timestamp: new Date().toISOString(),
        allergyId,
        doctorId,
      });
      return res.status(403).json({ message: 'The specified doctor did not add this allergy' });
    }

    await allergy.delete();

    logger.info('Allergy deleted successfully', {
      timestamp: new Date().toISOString(),
      doctorId,
      allergyId,
    });

    res.json({ message: 'Medical image deleted successfully' });
  } catch (error) {
    logger.error(error, {
      timestamp: new Date().toISOString(),
    });
    res.status(500).send('Internal Server Error');
  }
};

const deleteMedicationFromMedicalRecord = async (req, res, next) => {
  try {
    const { medicationId, doctorId } = req.params;

    const medication = await Medication.findById(medicationId);

    if (!medication) {
      return res.status(404).json({ message: 'Invalid medication ID' });
    }

    if (medication.doctorId.toString() !== doctorId.toString()) {
      logger.warn('The specified doctor tried to delete the medication', {
        timestamp: new Date().toISOString(),
        medicationId,
        doctorId,
      });
      return res.status(403).json({ message: 'The specified doctor did not add this medication' });
    }

    await medication.delete();

    logger.info('Medication deleted successfully', {
      timestamp: new Date().toISOString(),
      doctorId,
      medicationId,
    });

    res.json({ message: 'Medication deleted successfully' });
  } catch (error) {
    logger.error(error, {
      timestamp: new Date().toISOString(),
    });
    res.status(500).send('Internal Server Error');
  }
};
    
      
const deleteTreatmentFromMedicalRecord = async (req, res, next) => {
  try {
    const { treatmentId, doctorId } = req.params;

    const treatment = await Treatment.findById(treatmentId);

    if (!treatment) {
      return res.status(404).json({ message: 'Invalid treatment ID' });
    }

    if (treatment.doctorId.toString() !== doctorId.toString()) {
      logger.warn('The specified doctor tried to delete the treatment', {
        timestamp: new Date().toISOString(),
        treatmentId,
        doctorId,
      });
      return res.status(403).json({ message: 'The specified doctor did not add this treatment' });
    }

    await treatment.delete();

    logger.info('Treatment deleted successfully', {
      timestamp: new Date().toISOString(),
      doctorId,
      treatmentId,
    });

    res.json({ message: 'Treatment deleted successfully' });
  } catch (error) {
    logger.error(error, {
      timestamp: new Date().toISOString(),
    });
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
      


      const getMedicalRecordByPatientId = async (req, res, next) => {
        try {
          const { patientId } = req.params;
      
          const medicalRecord = await MedicalRecord.findOne({ patientId })
            .populate({
              path: 'medicalImages',
              select: '',
              options: { sort: { imageType: 1 } }
            })
            .select('-_id ')
            .populate('patientId', 'firstname lastname')
            .populate({
              path:'medications',
              select: '',
            })
            .populate({
              path:'treatments',
              select: '',
            })
            .populate({
              path:'allergies',
              select: '',
            })
            .lean()
            .exec(); // Add the .exec() method at the end of the query chain
      
          if (!medicalRecord) {
            return res.status(404).json({ message: 'Medical record not found' });
          }
      
          res.json({
            patientName: `${medicalRecord.patientId.firstname} ${medicalRecord.patientId.lastname}`,
            createdAt: medicalRecord.createdAt,
            updatedAt: medicalRecord.updatedAt,
            medicalImages: medicalRecord.medicalImages,
            medications: medicalRecord.medications,
            treatments: medicalRecord.treatments,
            allergies: medicalRecord.allergies
          });
      
        } catch (err) {
          res.status(500).send(err);
        }
      };
      

    

  module.exports = { addMedicalRecord, 
    deleteMedicalRecord, 
    deleteImageFromMedicalRecord, 
    getAllMedicalRecords, 
    getMedicalRecordByPatientId,
    deleteAllergyFromMedicalRecord,
    deleteMedicationFromMedicalRecord,
    deleteTreatmentFromMedicalRecord,};
