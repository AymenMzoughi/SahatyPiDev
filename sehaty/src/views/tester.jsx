import React from "react";
import axios from "axios";
import { Tabs } from "antd";
import "./Notification.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MDBNotification, MDBContainer } from "mdbreact";


const Notifications = () => {
 const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const markAllAsSeen = async () => {
    try {

      const response = await axios.post(
        "http://localhost:5000/user/notification",
        { userId:userId},
       
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {

      toast.error("Something went wrong");
    }
  };

  // const deleteAll=async()=>{
  //   try {
  //       dispatch(showLoading());
  //       const response = await axios.post("http://localhost:8080/api/user/delete-all-notifications", {userId : user._id} , {
  //           headers: {
  //               Authorization : Bearer ${localStorage.getItem("token")}
  //           }
  //       });
  //       dispatch(hideLoading());
  //       if (response.data.success) {
  //         toast.success(response.data.message)
  //         dispatch(setUser(response.data.data));
  //       } else {
  //         toast.error(response.data.message);
  //       }
  //     } catch (error) {
  //       dispatch(hideLoading());
  //       toast.error("Something went wrong");
  //     }
  
  return (
   <>
<MDBContainer
        style={{
          width: "auto",
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 9999
        }}
      >
        <MDBNotification
          show
          fade
          iconClassName="text-primary"
          title="Bootstrap"
          message="See? Just like this."
          text="just now"
        />
          {user?.unseenNotifications.map((notification) => (
              <h4
                className="h4all"
                onClick={() => navigate(notification.onClickPath)}
              >
                {notification.message}
              </h4>
            ))}
      </MDBContainer>



      <h1 className="page-noti">Notifications</h1>
      <hr className="horizontal" />
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <h1 className="d-flex justify-content-end unseenMark mark mk" onClick={()=>markAllAsSeen()}>
            <div className="unMark">Mark all as seen</div>
          </h1>
          {user?.unseenNotifications.map((notification) => (
            <p
              className="h4all"
              onClick={() => navigate(notification.onClickPath)}
            >
              {notification.message}
            </p>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="seen" key={1}>
          <span className="d-flex justify-content-end unseenMark" >
            <h1 className="mark del"> <div className="seMark">Delete all</div></h1>
          </span>
          {user?.seenNotifications.map((notification) => (
            <h3
              className="h4all"
              onClick={() => navigate(notification.onClickPath)}
            >
              {notification.message}
            </h3>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </>
  );

          }
export default Notifications;