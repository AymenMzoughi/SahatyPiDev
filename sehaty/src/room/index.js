import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const RoomPage=()=>{
    const {roomId} = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
      const userName = user.firstname;
      console.log("test",userName)

const myMeeting = async (element) =>{
    const appID =1774094633 ;
    const serverSecret = "15d34c0d2ed55aa9a5f9c02b5dd37ccd";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret,roomId, Date.now().toString(), userName);
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
        container: element,
        sharedLinks: [
            {
                name: "Copy Link",
                url: `http://localhost:3000/room/${roomId}`,
            },
        ],
        scenario: {
            mode:ZegoUIKitPrebuilt.OneONoneCall, 
        },
        showScreenShareButton : true,
    });
};




    return(
        <div>
<div ref={myMeeting} />

</div>
    );
}

export default RoomPage;