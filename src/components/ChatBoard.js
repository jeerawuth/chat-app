import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import database from "../database/database";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as action from "../actions/userAction";
import AddChat from "./AddChat";
import Loading from "./Loading";

const ChatBoard = ({ data, onSetDefaultRoom }) => {
  const [chatLists, setChatLists] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const currentDateTime = useRef(Date.now().valueOf()).current;
  useEffect(() => {
    onSetDefaultRoom();
  }, [onSetDefaultRoom]);
  useEffect(() => {
    setChatLoading(true);
    const ref = database
      .collection(`rooms/${data.currentRoom.id}/chats`)
      .orderBy("created")
      .where("created", ">", currentDateTime - 100000);
    ref.onSnapshot(
      (snapshot) => {
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
        <div className="row">
          <Loading
            style={{
              position: "relative",
              top: "80%",
              left: "20%",
            }}
          />
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
        </div>
      ) : (
        <div className="container">
          {chatLoading && !data.currentRoom.id ? (
            <div className="row">
              <div className="col-sm-6">
                <div className="text-success p-3 text-center">
                  กำลังโหลดข้อมูลห้อง...
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-sm-6 mt-4">
                <div className="alert-success p-3 text-center">
                  เลือกห้องที่ต้องการสนทนา
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {chatLists.length > 0 ? (
        <div className="row">
          <div
            className="col-11 scroll mx-4 my-3 border rounded py-4"
            style={{
              height: "300px",
              overflowY: "auto",
            }}
          >
            {chatLists.map((item, index) => {
              return (
                <div key={index} className="container">
                  {item.userId === data.user.uid ? (
                    <div className="d-flex justify-content-end">
                      <div className="d-flex align-items-center">
                        <div className="d-flex flex-column align-items-end">
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
                          src={item.photoURL ? item.photoURL : item.gravatar}
                          alt="user"
                          width="40"
                          height="40"
                          className="img mr-1 rounded-circle"
                          style={{ flex: 1 }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-start">
                      <div className="d-flex align-items-center">
                        <img
                          src={item.photoURL ? item.photoURL : item.gravatar}
                          alt="user"
                          width="40"
                          height="40"
                          className="img mr-1 rounded-circle"
                          style={{ flex: 1 }}
                        />
                        <div className="d-flex flex-column align-items-start">
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
      ) : (
        <div className="row">
          <div
            className="col-10 scroll m-4 border rounded py-4 overflow-auto"
            style={{
              height: "300px",
              overflowY: "auto",
            }}
          >
            <div className="alert-info p-3 text-center">
              ยังไม่มีรายการแชตในตอนนี้
            </div>
          </div>
        </div>
      )}
      {data.currentRoom.id && data.currentRoom.name ? (
        <AddChat roomId={data.currentRoom.id} user={data.user} />
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
    onSetDefaultRoom: () => {
      dispatch(action.onSetDefaultRoom());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatBoard);
