import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import database from "../../database/database";
import EditRoom from "../room/EditRoom";
import DeleteRoom from "../room/DeleteRoom";
import AddRoom from "../room/AddRoom";
const Rooms = ({ data }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const addRoom = (addName, addDetails) => {
    const ref = database.collection("rooms");
    const user = {
      id: data.user.uid,
      displayName: data.user.displayName,
      photoURL: data.user.photoURL,
    };
    return ref.add({
      name: addName,
      details: addDetails,
      createdBy: {
        uid: user.id,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
    });
  };
  const deleteRoom = (id) => {
    const ref = database.collection("rooms");
    return ref.doc(id).delete(); //return Promise
  };
  const getRoomById = (id) => {
    const roomsRef = database.collection("rooms").doc(id);
    return roomsRef.get(); //return Promise
  };
  const editRoomById = (id, editName, editDetail) => {
    const ref = database.collection("rooms").doc(id);
    return ref.set({
      name: editName,
      details: editDetail,
      createdBy: {
        uid: data.user.uid,
        displayName: data.user.displayName,
        photoURL: data.user.photoURL,
      },
    });
  };
  return (
    <div className="container">
      {!loading ? (
        <div className="row">
          <div className="d-flex flex-row justify-content-center col-12 text-center">
            <div className="p-2">ห้องทั้งหมด [{rooms.length}]</div>
            <div className="p-2">
              <AddRoom addRoom={addRoom} />
            </div>
          </div>
        </div>
      ) : null}
      <div className="row card">
        <div className="col-12 text-center">
          {loading ? (
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="container" id="roomLists">
              {rooms.map((value, index) => {
                return (
                  <div>
                    <div className="row" key={index}>
                      <a
                        className="text-primary text-left"
                        data-toggle="collapse"
                        href={`#room${value.id}`}
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        {value.name}
                      </a>
                    </div>

                    <div className="row">
                      <div
                        className="collapse col-8 mx-auto"
                        id={`room${value.id}`}
                      >
                        <div className="col-sm-12 alert-success">
                          {value.details}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <EditRoom
                          editRoomById={editRoomById}
                          getRoomById={() => getRoomById(value.id)}
                          id={value.id}
                        />
                      </div>
                      <div className="col-sm-6">
                        <DeleteRoom
                          deleteRoomById={() => deleteRoom(value.id)}
                          roomName={value.name}
                          id={value.id}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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