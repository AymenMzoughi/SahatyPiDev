import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "../components/Sidebar";
import AddTip from "../components/addTip";
import ListTip from "../components/TipsCard";
import VideoPlayer from "../components/videoPlayer";
import logo from '../assets/téléchargement.jpg';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import Home from "./Home";
import Search from "../components/SearchTips"
function Dashboard() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="app" >
      <main className="content" style={{ display: "flex", marginLeft: "400px", marginTop: "10px", backgroundColor: "#FFFFFF"}}>

  <Routes>
    <Route path="/ListTip" element={<ListTip />} />
    <Route path="/search" element={<Search />} />
    <Route path="/video" element={<VideoPlayer />} />
    <Route path="/chat" element={<Home />} />
  </Routes>
</main>

    </div>

  );
}

export default Dashboard;