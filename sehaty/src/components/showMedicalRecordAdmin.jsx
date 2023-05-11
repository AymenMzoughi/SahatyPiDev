import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Box} from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
const MedicalRecordsAdmin = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    // Fetch all medical records
    const fetchMedicalRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/MedicalRecord/showMedRec`); // Update the API endpoint to match your server endpoint
        const medicalRecordsData = response.data;
        setMedicalRecords(medicalRecordsData);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };
    fetchMedicalRecords();
  }, []);

  const handleDeleteMedicalRecord = async (medicalRecordId) => {
    try {
      const response = await axios.post(`http://localhost:5000/MedicalRecord/deleteMedRec/${medicalRecordId}`); // Update the API endpoint to match your server endpoint
      console.log(response.data); // Handle success
      window.location.reload();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  const columns = [
    {
      field: 'image',
      headerName: 'Photo',
      flex: 1,
      renderCell: ({ row }) => (
        <img src={`http://localhost:5000/${row.image}`} alt="pdp" style={{ width: 50, height: 50, borderRadius: '50%' }} />
      ),
    },
        { field: 'patientName', headerName: 'Patient Name', flex: 1 },
          {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => (
        <>
          <Box sx={{ mx: 1 }}>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteMedicalRecord(row._id)}>
            <DeleteIcon />
            </IconButton>
          </Box>
    </>
      ),
    },
  ];
  return (
       <Box sx={{ height:600 , width: '100%' }}>
    <DataGrid
  rows={MedicalRecordsAdmin }
  columns={columns}
  pageSize={5}
  rowsPerPageOptions={[5, 5, 5]}
  disableSelectionOnClick
  getRowId={(row) => row._id}
  sx={{ columnGap: '0px' }}
  columnBuffer={10} // <-- augmenter la valeur de columnBuffer
/>
    </Box>
    /* <div> */
      // {/* Render medical records */}
      // {/* medicalRecords.map((record) => (
    //     <div key={record._id}>
    //       <p>Medical Record ID: {record._id}</p>
    //       <p>Patient Name: {record.patientName}</p>
    //       <ul>
    //         {record.medicalImages.map((image) => (
    //           <li key={image._id}>
    //             Medical Image ID: {image._id}, Image URL: {image.imageUrl}
    //           </li>
    //         ))}
    //       </ul>
    //       <button onClick={() => handleDeleteMedicalRecord(record._id)}>
    //         Delete Medical Record
    //       </button>
    //     </div>
    //   ))}
    // </div> */}
  );
};

export default MedicalRecordsAdmin;
