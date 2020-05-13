import React, { useState } from "react";
import database from "../database/database";
const AddChat = ({ roomId, user }) => {
  const [addChat, setAddChat] = useState("");
  const addMessageChat = (e) => {
    e.preventDefault();
    const ref = database.collection(`rooms/${roomId}/chats`);
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
  };
  return (
    <div className="container">
      <form className="form-row" onSubmit={addMessageChat}>
        <input
          type="text"
          className="form-control col-6"
          id="addChat"
          placeholder="กรอกข้อความ"
          value={addChat}
          onChange={(e) => setAddChat(e.target.value)}
          style={{ width: "100%" }}
        />
        <button
          type="submit"
          className="btn btn-primary mb-2 ml-1 col-1"
          disabled={addChat === "" ? true : null}
        >
          ส่ง
        </button>
      </form>
    </div>
  );
};

export default AddChat;
