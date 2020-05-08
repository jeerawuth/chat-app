import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import database from "../database/database";
const Rooms = ({ id, data }) => {
  const [editLoading, setEditLoading] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    setEditLoading(true);
    const roomsRef = database.collection("rooms").doc(id);
    roomsRef
      .get()
      .then((result) => {
        setRoomName(result.roomName);
        setDetails(result.details);
        setEditLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const editRoom = (id) => {
    const ref = database.collection("rooms").doc(id);
    const user = {
      id: data.user.uid,
      displayName: data.user.displayName,
      photoURL: data.user.photoURL,
    };
    ref
      .set({
        name: roomName,
        details: details,
        createdBy: {
          uid: user.id,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      })
      .then(() => {
        console.log("edit ok");
      });
  };

  return (
    <div className="container">
      {editLoading ? (
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="container">
          <div
            className="btn btn-sm btn-info"
            data-toggle="modal"
            data-target="#editModal"
          >
            <i className="fas fa-edit"></i>
          </div>
          <div
            className="modal-dialog"
            role="document"
            style={{ maxWidth: 300 }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editRoomLabel">
                  แก้ไขห้องแชต
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body p-3">
                <form>
                  <div className="form-group">
                    <label>ชื่อห้อง</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="กรอกชื่อห้อง"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>รายละเอียดของห้อง</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  data-dismiss="modal"
                >
                  ปิด
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-dismiss="modal"
                  onClick={() => editRoom(id)}
                >
                  อัพเดตห้อง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};
export default connect(mapStateToProps)(Rooms);
