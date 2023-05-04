import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";

import AddTip from "../components/addTip";
import ListTip from "../components/ListTip";


import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";

function Dashboard() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div>
    <Topbar setIsSidebar={setIsSidebar} />
    <Sidebar isSidebar={isSidebar} />
    <main style={{ paddingTop: '100px' }}>
    <Routes>
    <Route path="/addTip" element={<AddTip />} />
    <Route path="/ListTip" element={<ListTip />} />
    </Routes>
    </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Dashboard;
