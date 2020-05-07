import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import database from "../database/database";
const Rooms = ({ data }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [details, setDetails] = useState("");
  useEffect(() => {
    const roomsRef = database.collection("rooms");
    setLoading(true);
    roomsRef.onSnapshot(
      (snapshot) => {
        let tempDataArray = [];
        snapshot.forEach((doc) => {
          tempDataArray = [
            ...tempDataArray,
            {
              id: doc.id,
              name: doc.data().name,
              details: doc.data().details,
              createdBy: doc.data().createdBy,
            },
          ];
        });
        setRooms((oldDataArray) => tempDataArray);
        setLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const addRoom = (event) => {
    event.preventDefault();
    const ref = database.collection("rooms");
    const user = {
      id: data.user.uid,
      displayName: data.user.displayName,
      photoURL: data.user.photoURL,
    };
    ref
      .add({
        id: ref.doc().id,
        name: roomName,
        details: details,
        createdBy: {
          uid: user.id,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      })
      .then(() => {
        console.log("ok");
      });
  };

  return (
    <div className="container">
      {!loading ? (
        <div className="row">
          <div className="d-flex flex-row justify-content-center col-12 text-center">
            <div className="p-2">ห้องทั้งหมด [{rooms.length}]</div>
            <div className="p-2">
              <button
                className="btn btn-sm btn-primary"
                data-toggle="modal"
                data-target="#addModal"
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="row">
        <div className="col-12 text-center">
          {loading ? (
            <div>loading</div>
          ) : (
            rooms.map((item, index) => {
              return (
                <div key={index}>
                  <div>{item.name}</div>
                  <div>{item.details}</div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document" style={{ maxWidth: 300 }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                เพิ่มห้องแชต
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
              <form onSubmit={addRoom}>
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
                onClick={addRoom}
              >
                สร้างห้อง
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};
export default connect(mapStateToProps)(Rooms);
