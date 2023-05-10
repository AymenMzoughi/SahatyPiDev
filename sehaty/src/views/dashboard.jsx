import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";

import AddTip from "../components/addTip";
import ListTip from "../components/ListTip";


import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import AmbulanceServiceA from "../components/ambulanceAdmin";
import HospitalComponent from "../components/hospital";
import MedicalRecordsAdmin from "../components/showMedicalRecordAdmin";

function Dashboard() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
  
      <div style={{ display: "flex" }}>
        <Sidebar isSidebar={isSidebar} />
        <div style={{ flex: "1", marginLeft: "20px" }}>
          <Topbar setIsSidebar={setIsSidebar} />
          <main>
            <Routes>
              <Route path="/addTip" element={<AddTip />} />
              <Route path="/ListTip" element={<ListTip />} />
              <Route path="/ambulance" element={<AmbulanceServiceA />} />
              <Route path="/hospital" element={<HospitalComponent />} />
              <Route path="/medicalrecord" element={<MedicalRecordsAdmin />} />



            </Routes>
          </main>
        </div>
      </div>
  
    </ThemeProvider>
  </ColorModeContext.Provider>
  
  
  );
}

export default Dashboard;
