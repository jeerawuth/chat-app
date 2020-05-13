import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import database from "../database/database";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as action from "../actions/userAction";
import AddChat from "./AddChat";

const ChatBoard = ({ data }) => {
  const [chatLists, setChatLists] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const currentDateTime = useRef(Date.now().valueOf()).current;
  useEffect(() => {
    const ref = database
      .collection(`rooms/${data.currentRoom.id}/chats`)
      .orderBy("created")
      .where("created", ">", currentDateTime);
    ref.onSnapshot(
      (snapshot) => {
        setChatLoading(true);
        let tempDataArray = [];
        snapshot.forEach((doc) => {
          tempDataArray.push({
            id: doc.id,
            message: doc.data().message,
            userId: doc.data().userId,
            displayName: doc.data().displayName,
            photoURL: doc.data().photoURL,
          });
        });
        setChatLists((oldDataArray) => tempDataArray);
        setChatLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [data.currentRoom.id, data.createdBy, currentDateTime]);
  if (!data.loginStatus) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 mx-auto text-center">
            <div className="display-4">ChatBoard Component</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      {chatLoading ? (
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : null}
      {data.currentRoom.id && data.currentRoom.name ? (
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="display-4 text-info">
                ห้อง {data.currentRoom.name}
              </div>
              <hr />
            </div>
          </div>
          <AddChat roomId={data.currentRoom.id} user={data.user} />
          <hr />
        </div>
      ) : (
        <div className="display-4">กรุณาเลือกห้อง</div>
      )}
      {chatLists.length > 0 ? (
        <div className="row mx-auto p-4">
          <div className="col-10 scroll mr-4 border rounded py-4">
            {chatLists.map((item, index) => {
              console.log(item.userId);
              console.log(data.user.uid);
              return (
                <div key={index} className="container">
                  {item.userId === data.user.uid ? (
                    <div className="d-flex justify-content-end">
                      <div className="d-flex align-items-center">
                        <div className="d-flex flex-column">
                          <div className="text-info d-flex justify-content-end">
                            <div>@{item.displayName}</div>
                          </div>
                          <div
                            className="px-4 py-2 mr-2 rounded d-flex justify-content-end"
                            style={{
                              backgroundColor: "lightgreen",
                            }}
                          >
                            <div className="text-right">{item.message}</div>
                          </div>
                        </div>
                        <img
                          src={item.photoURL}
                          alt="user"
                          width="40"
                          height="40"
                          className="img mr-1 rounded-circle"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-start">
                      <div className="d-flex align-items-center">
                        <img
                          src={item.photoURL}
                          alt="user"
                          width="40"
                          height="40"
                          className="img mr-1 rounded-circle"
                        />
                        <div className="d-flex flex-column">
                          <div className="text-info d-flex justify-content-start">
                            <div>@{item.displayName}</div>
                          </div>
                          <div
                            className="px-4 py-2 mr-2 rounded d-flex justify-content-start"
                            style={{
                              backgroundColor: "mediumTurquoise",
                            }}
                          >
                            <div className="text-left">{item.message}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSetCurrentRoom: (id) => {
      dispatch(action.onSetCurrentRoom(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatBoard);
