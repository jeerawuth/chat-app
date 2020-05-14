import React, { useState, useEffect } from "react";
import database from "../database/database";
const AddChat = ({ roomId, user }) => {
  const [addChat, setAddChat] = useState("");
  const [roomIdIsValid, setRoomIdIsValid] = useState(true);

  useEffect(() => {
    setRoomIdIsValid(true);
    const roomRef = database.collection("rooms").doc(roomId);
    roomRef.get().then((doc) => {
      if (doc.data()) {
        if (!doc.data().name) {
          console.log("no name");
          setRoomIdIsValid(false);
        }
      }
    });
  }, [roomId]);
  const addMessageChat = (e) => {
    e.preventDefault();
    const ref = database.collection(`rooms/${roomId}/chats`);
    const roomRef = database.collection("rooms").doc(roomId);
    roomRef.get().then((doc) => {
      if (doc.data()) {
        if (!doc.data().name) {
          setRoomIdIsValid(false);
        } else {
          const chatObj = {
            roomId: roomId,
            message: addChat,
            userId: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            created: new Date().valueOf(),
          };
          ref.add(chatObj).then(() => {
            setAddChat("");
          });
          setRoomIdIsValid(true);
        }
      } else {
        setRoomIdIsValid(false);
      }
    });
  };

  return (
    <div className="container">
      {!roomIdIsValid ? (
        <div className="row">
          <div className="alert-danger col-sm-8 mx-autor p-4">
            ห้องนี้ถูกลบไปแล้ว กรุณาเลือกห้องอื่น
          </div>
        </div>
      ) : null}
      {roomId ? (
        <form className="form-row" onSubmit={addMessageChat}>
          <input
            type="text"
            className="form-control col-sm-10 px-2"
            id="addChat"
            placeholder="กรอกข้อความ"
            value={addChat}
            onChange={(e) => setAddChat(e.target.value)}
            style={{ width: "100%" }}
          />
          <button
            type="submit"
            className="btn btn-primary mb-2 ml-1 col-sm-1"
            disabled={addChat === "" ? true : null}
          >
            ส่ง
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default AddChat;
