import React, { useEffect, useState } from "react";
import PharmacistProfile from "../components/PharmacistProfile";
import PatientProfile from "../components/PatientProfile";
import DoctorProfile from "../components/DoctorProfile";
//import { PDFViewer } from "@react-pdf/renderer";

export default function UserProfile() {
  const [elementToRender, setElementToRender] = useState(null);
  const userRole = () => {
    console.log(user);

    if (user && user.role === "Docteur")
      setElementToRender(<DoctorProfile user={user} />);
    else if (user && user.role === "Patient")
      setElementToRender(<PatientProfile user={user} />);
    else if (user && user.role === "Pharmacien")
      setElementToRender(<PharmacistProfile user={user} />);
  };
  const [user, setUser] = useState(null);
  const jwtToken = localStorage.getItem("token");

  const getUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log("error  " + error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  useEffect(() => {
    userRole();
  }, [user]);
  return (
    <section style={{ backgroundColor: "#eee" }}>{elementToRender}</section>
  );
}
