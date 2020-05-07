import React, { useEffect } from "react";
import database from "../database/database";

const Rooms = () => {
  let roomsRef = database.collection("rooms");
  const addRoom = () => {
    const roomName = "test";
    const roomDetail = "detail test";
    const user = {
      id: "idxxxxxxxxxx",
      displayName: "Jeerawuth Varin",
      photoURL: "no image",
    };
    roomsRef
      .add({
        name: roomName,
        details: roomDetail,
        createdBy: {
          userId: user.id,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      })
      .then(() => {
        console.log("ok");
      });
  };
  useEffect(() => {});
  return (
    <div>
      <button onClick={addRoom}>add room</button>
    </div>
  );
};

export default Rooms;
