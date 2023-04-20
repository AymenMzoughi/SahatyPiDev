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
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log', level: 'info' }),
    new winston.transports.MongoDB({
      level: 'info',
      db: mongoose.connection,
      options: { useUnifiedTopology: true },
      collection: 'medical_logs',
      metaKey: 'meta',
      transformer: (log) => {
        const { patientId, doctorId, medicalRecordId } = log.meta || {};
        return {
          ...log,
          doctorId,
          medicalRecordId,
          patientId,
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

// const addMedicalRecord = async (req, res, next) => {
//   try {
//     const { patientId, doctorId, imageType } = req.body;
//     const images = req.files;

//     // Check if the medical record already exists
//     let existingMedicalRecord = await MedicalRecord.findOne({ patientId });
//     if (!existingMedicalRecord) {
//       // Create a new medical record if it doesn't exist
//       existingMedicalRecord = new MedicalRecord({ patientId, doctorId });
//       await existingMedicalRecord.save();
//       logger.info('Created new medical record', {
//         timestamp: new Date().toISOString(),
//       });
//     } else {
//       // Update the doctor id of the existing medical record
//       existingMedicalRecord.doctorId = doctorId;
//       await existingMedicalRecord.save();
//       logger.info('Updated existing medical record', {
//         timestamp: new Date().toISOString(),
//       });
//     }

//     // Create an array of new medical images to be added
//     const newMedicalImages = images.map((image) => ({
//       doctorId,
//       medicalRecordId: existingMedicalRecord._id,
//       imageUrl: image.path,
//       imageName: image.filename,
//       imageType: imageType,
//     }));

//     logger.info(`Adding ${newMedicalImages.length} new medical images`, {
//       timestamp: new Date().toISOString(),
//     });

//     // Insert the new medical images
//     const savedMedicalImages = await MedicalImage.insertMany(newMedicalImages);

//     // Add the new medical images to the existing medical record
//     existingMedicalRecord.medicalImages.push(
//       ...savedMedicalImages.map((image) => image._id)
//     );
//     await existingMedicalRecord.save();

//     const user = await UserModel.findOne({ _id: patientId }).select('mail numero lastname firstname');

//     // Send email notification
//     const subject = 'New Medical Record Added';
//     const html = `
//       <html>
//         <body>
//         <center><img src="https://i.imgur.com/nIyZjOx.png" width="128" height="128"></center>
//         <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:28px;color:#0a4898;font-size:14px;text-align:center">
//         <em>Dear ${user.lastname} ${user.firstname},</em><br />
//       </p>
//       <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:28px;color:#0a4898;font-size:14px;text-align:center">
//         <em>We are pleased to inform you that your medical record number ${existingMedicalRecord._id} has been updated.</em>
//       </p>
//       <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:28px;color:#0a4898;font-size:14px;text-align:center">
//         <em>Our team has reviewed and approved the record, which contains ${newMedicalImages.length} new files in ${imageType} type.</em>
//       </p>
//       <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:28px;color:#0a4898;font-size:14px;text-align:center">
//         <em>Please login to your account to view more details</em>
//       </p>
//       <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:28px;color:#0a4898;font-size:14px;text-align:center">
//         <em>Thank you for choosing our services.</em>
//       </p>
//       <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:28px;color:#0a4898;font-size:14px;text-align:center">
//         <em>Sincerely, Sehaty Team</em>
//       </p>
//         </body>
//       </html>
//     `;
//     await sendMail(user.mail, subject, html);

//     // Send SMS notification
//     const message = await nexmoClient.message.sendSms(
//       'Vonage APIs', // Replace with the Nexmo virtual number you purchased
//       21655736345,
//       `Dear ${user.lastname} ${user.firstname}, We are pleased to inform you that your medical record number ${existingMedicalRecord._id} has been updated. Our team has reviewed and approved the record, which contains ${newMedicalImages.length} new files in medical letter type. Please login to your account to view more details. Thank you for choosing our services.
//       Sincerely, Sehaty Team`,
//       { type: 'unicode' },
//       (err, responseData) => {
//         if (err) {
//           logger.error('Error sending SMS', { error: err });
//           return;
//         }
//         logger.info('SMS sent successfully', { responseData });
//       }
//     );
    

//     res.json({
//       medicalRecord: existingMedicalRecord,
//       medicalImages: savedMedicalImages,
//     });
//   } catch (err) {
//     logger.error(err, {
//       timestamp: new Date().toISOString(),
     
//     });
//     res.status(500).send('Internal Server Error');
//   }
// };


  // Add function for Medical Image
const addMedicalImage = async (doctorId, medicalRecordId, imageUrl, imageType, imageName) => {
  try {
  const medicalImage = new MedicalImage({
    doctorId,
    medicalRecordId,
    imageUrl,
    imageType,
    imageName,
  });
  await medicalImage.save();
  logger.info('Medical Image added successfully', {
    timestamp: new Date().toISOString(),
    doctorId,
    medicalRecordId,
    imageUrl,
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
    imageUrl,
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
    const { patientId, doctorId } = req.body;

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
    if (req.body.medications) {
      const medications = req.body.medications;
      const medicationPromises = medications.map(medication =>
        addMedication(doctorId,existingMedicalRecord._id, medication.name, medication.dosage, medication.frequency)
      );
      const savedMedications = await Promise.all(medicationPromises);
      existingMedicalRecord.medications.push(...savedMedications.map(medication => medication._id));
    }

    if (req.body.treatments) {
      const treatments = req.body.treatments;
      const treatmentPromises = treatments.map(treatment =>
        addTreatment(doctorId, existingMedicalRecord._id,treatment.name, treatment.description, treatment.startDate, treatment.endDate)
      );
      const savedTreatments = await Promise.all(treatmentPromises);
      existingMedicalRecord.treatments.push(...savedTreatments.map(treatment => treatment._id));
    }

    if (req.body.allergies) {
      const allergies = req.body.allergies;
      const allergyPromises = allergies.map(allergy =>
        addAllergy(doctorId, existingMedicalRecord._id,allergy.name, allergy.severity, allergy.reaction)
      );
      const savedAllergies = await Promise.all(allergyPromises);
      existingMedicalRecord.allergies.push(...savedAllergies.map(allergy => allergy._id));
    }

    if (req.body.medicalImages) {
      const medicalImages = req.body.medicalImages;
      const medicalImagePromises = medicalImages.map(medicalImage =>
        addMedicalImage(doctorId, existingMedicalRecord._id, medicalImage.imageUrl, medicalImage.imageType, medicalImage.imageName)
      );
      const savedMedicalImages = await Promise.all(medicalImagePromises);
      existingMedicalRecord.medicalImages.push(...savedMedicalImages.map(medicalImage => medicalImage._id));
    }

    await existingMedicalRecord.save();
    
        const user = await UserModel.findOne({ _id: patientId }).select('mail numero lastname firstname');
        const doctorName = await UserModel.findOne({ _id: doctorId }).select('lastname firstname');
        console.log(req.body.medicalImages.map(medicalImage => medicalImage.imageType))
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
        <li><span style="color: #000000;"><em>Files: 1 image of type ${req.body.medicalImages.map(medicalImage => medicalImage.imageType) || 'N/A'} </em></span></li>
        <li><span style="color: #000000;"><em>Allergies: ${req.body.allergies.map(allergy => allergy.name).join(', ') || 'N/A'}</em></span></li>
        <li><span style="color: #000000;"><em>Treatments: ${req.body.treatments.map(treatment => treatment.name).join(', ') || 'N/A'}</em></span></li>
        <li><span style="color: #000000;"><em>Medications: ${req.body.medications.map(medication => medication.name).join(', ') || 'N/A'}</em></span></li>
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

    logger.info('Medical image deleted successfully', {
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
      

      const downloadFile = async (req, res, next) => {
        try {
          const filePath = req.params.filePath; // get file path from request params
          const fullPath = path.join(__dirname, filePath); // create full path to file
          const fileExists = fs.existsSync(fullPath); // check if file exists
      
          if (fileExists) {
            // set response headers
            res.setHeader('Content-Disposition', `attachment; filename=${path.basename(fullPath)}`);
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Length', fs.statSync(fullPath).size);
      
            // create read stream and pipe it to the response
            const readStream = fs.createReadStream(fullPath);
            readStream.pipe(res);
      
            logger.info('File downloaded successfully', {
              timestamp: new Date().toISOString(),
              filePath,
            });
          } else {
            // return 404 if file does not exist
            res.status(404).send('File not found');
          }
        } catch (err) {
          logger.error(err, {
            timestamp: new Date().toISOString(),
          });
          res.status(500).send('Internal Server Error');
        }
      };

      const getMedicalRecordByPatientId = async (req, res, next) => {
        try {
          const { patientId } = req.params;
      
          const medicalRecord = await MedicalRecord.findOne({ patientId })
            .populate({
              path: 'medicalImages',
              select: 'imageUrl imageType imageName createdAt updatedAt -_id',
              options: { sort: { imageType: 1 } }
            })
            .select('-_id ')
            .populate('patientId', 'firstname lastname')
            .lean();
      
          if (!medicalRecord) {
            return res.status(404).json({ message: 'Medical record not found' });
          }
      
          res.json({
            patientName: `${medicalRecord.patientId.firstname} ${medicalRecord.patientId.lastname}`,
            createdAt: medicalRecord.createdAt,
            updatedAt: medicalRecord.updatedAt,
            medicalImages: medicalRecord.medicalImages
          });
      
        } catch (err) {
          res.status(500).send('Internal Server Error');
        }
      };
      
      
      
      
      
      
    

  module.exports = { addMedicalRecord, 
    deleteMedicalRecord, 
    deleteImageFromMedicalRecord, 
    getAllMedicalRecords, 
    downloadFile, 
    getMedicalRecordByPatientId,
    deleteAllergyFromMedicalRecord,
    deleteMedicationFromMedicalRecord,
    deleteTreatmentFromMedicalRecord};
