import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import database from "../database/database";
import EditRoom from "./EditRoom";
const Rooms = ({ data }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    setLoading(true);
    const ref = database.collection("rooms");
    ref.onSnapshot(
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
  }, [setLoading]);

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
        name: roomName,
        details: details,
        createdBy: {
          uid: user.id,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      })
      .then(() => {
        setRoomName("");
        setDetails("");
        console.log("add ok");
      });
  };
  const deleteRoomHandler = (id) => {
    const ref = database.collection("rooms");
    ref
      .doc(id)
      .delete()
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRoomById = (id) => {
    const roomsRef = database.collection("rooms").doc(id);
    console.log(id);
    return roomsRef.get();
    // .then((result) => {
    //   setRoomName(result.data().name);
    //   setDetails(result.data().details);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  const editRoomById = (id, editName, editDetail) => {
    console.log("edit" + id);
    const ref = database.collection("rooms").doc(id);
    ref
      .set({
        name: editName,
        details: editDetail,
        createdBy: {
          uid: data.user.uid,
          displayName: data.user.displayName,
          photoURL: data.user.photoURL,
        },
      })
      .then(() => {
        console.log("edit ok");
      });
  };

  return (
    <div className="container">
      {!loading ? (
        <div className="row">
          <div className="d-flex flex-row justify-content-center col-12 text-center">
            <div className="p-2">ห้องทั้งหมด [{rooms.length}]</div>
            <div className="p-2">
              <div
                className="btn btn-sm btn-primary"
                data-toggle="modal"
                data-target="#addModal"
              >
                <i className="fas fa-plus"></i>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="row">
        <div className="col-12 text-center">
          {loading ? (
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="accordion" id="roomLists">
              {rooms.map((item, index) => {
                return (
                  <div className="card" key={index}>
                    <div className="text-primary">
                      <div className="d-flex justify-content-between align-items-center pr-1">
                        <div
                          className="btn btn-link collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target={`#list${item.id}`}
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          <div>{item.name} </div>
                        </div>
                        {/* <div
                          className="btn btn-sm btn-info"
                          data-toggle="modal"
                          data-target="#editModal"
                          onClick={() => getRoomById(item.id)}
                        >
                          <i className="fas fa-edit"></i>
                        </div> */}
                        <EditRoom
                          editRoomById={editRoomById}
                          getRoomById={() => getRoomById(item.id)}
                          id={item.id}
                        />
                        <div
                          className="btn btn-sm btn-danger"
                          data-toggle="modal"
                          data-target="#deleteModal"
                        >
                          <i className="fas fa-trash"></i>
                        </div>
                      </div>
                    </div>
                    <div
                      id={`list${item.id}`}
                      className="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#roomLists"
                    >
                      <div className="text-warning p-2 text-left">
                        {item.details}
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="deleteModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="editRoomLabel"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog"
                        role="document"
                        style={{ maxWidth: 300 }}
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="editRoomLabel">
                              ยืนยันการลบห้องแชต
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
                            <div>
                              ยืนยันการลบห้อง {item.name} ข้อมูลการแชตต่างๆ
                              จะไม่สามารถใช้งานได้
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              data-dismiss="modal"
                            >
                              ยกเลิก
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              data-dismiss="modal"
                              onClick={() => deleteRoomHandler(item.id)}
                            >
                              ลบห้อง
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addRoomLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document" style={{ maxWidth: 300 }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addRoomLabel">
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
