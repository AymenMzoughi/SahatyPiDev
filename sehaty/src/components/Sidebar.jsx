import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import QueueIcon from '@mui/icons-material/Queue';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box   sx={{
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.secondary.contrastText,
    }} >
  <ProSidebar collapsed={isCollapsed}>
    <Menu iconShape="square">
      <Box paddingLeft={isCollapsed ? undefined : "10%"}>
        <Item title="All Tips" to="./ListTip" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
        <Item title="Search Tips" to="./search" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />

        <Item title="Chat With Patients" to="/payment" icon={<DynamicFeedIcon />} selected={selected} setSelected={setSelected} />
      </Box>
    </Menu>
  </ProSidebar>
</Box>

  );
};

export default Sidebar;
