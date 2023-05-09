import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { MainButton, ProfileButton } from "./StyledComponents";
import { useDispatch } from "react-redux";
import { AuthActions } from '../slices/connectSlice';
import { useNavigate } from "react-router-dom";
const AccountCollapse = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token")
  const [showDropdown, setShowDropdown] = useState(false);
  const handleClick = () => {
    setShowDropdown((prev) => !prev);
  };
  const navigate = useNavigate();
  return (
    <Dropdown>
      <ProfileButton
        style={{ backgroundColor: "white", color: "gray", borderColor: "gray" }}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faUser} />
      </ProfileButton>
      <Dropdown.Menu
        style={{
          position: "absolute",
          transform: "translateX(-50%)",
        }}
        show={showDropdown}
      >
        <Dropdown.Item eventKey="1" href="/profile">Account information</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          eventKey="4"
          style={{ color: "red", fontWeight: "medium" }}
          onClick={() => {
            dispatch(AuthActions.logout(token));
            navigate('/home')
            localStorage.removeItem("token")
          }}
        >
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AccountCollapse;
