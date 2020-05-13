import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom";
import database, { storage } from "../database/database";
import * as action from "../actions/userAction";
const Profile = ({ data, onUpdatePhotURL }) => {
  const userRef = database.collection("users").doc(`${data.user.uid}`);
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  // useEffect(() => {
  //   userRef.onSnapshot((doc) => {
  //     if (doc.data()) {
  //       console.log(doc.data().photoURL);
  //       if (doc.data().photoURL) setPhotoURL(doc.data().photoURL);
  //       console.log(doc.data().photoURL);
  //     }
  //   });
  //   console.log(data.user.photoURL);
  // });

  useEffect(() => {
    console.log(data.user.photoURL);
    setPhotoURL(data.user.photoURL);
  }, [data.user.photoURL]);

  const changeProfilePhotoHandler = () => {
    storage
      .child("user-profiles")
      .child(`${data.user.uid}`)
      .child("photoURL")
      .put(file)
      .then((response) => {
        response.ref.getDownloadURL().then((photoURL) => {
          userRef.update({ photoURL: photoURL }).then(() => {
            console.log(photoURL);
            onUpdatePhotURL(photoURL); //from dispatch to prop
          });
        });
      });
  };

  if (!data.loginStatus) {
    return (
      <div className="container">
        <Redirect to="/login" />
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-10 mx-auto text-center">
          <div className="display-4 mt-3">สวัสดี: {data.user.displayName}</div>
          {photoURL ? (
            <img
              className="rounded float-center"
              src={photoURL}
              alt="user"
              width="20%"
            />
          ) : null}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-10 mx-auto text-center">
          <div className="text-success p-3">
            <div className="custom-file col-sm-10 mx-auto text-center">
              <div className="input-group mb-3 p-2 col-sm-10 mx-auto text-center">
                <div
                  className="btn btn-sm btn-success"
                  data-toggle="modal"
                  data-target={`#profile`}
                >
                  <i className="fas fa-user"> เปลี่ยนรูปโปรไฟล์</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id={`profile`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="changePicLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document" style={{ maxWidth: 400 }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="changePicLabel">
                เลือกรูปโปรไฟล์ใหม่
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
            <div className="modal-body m-3">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                onChange={(e) => {
                  console.log("อินพุตเปลี่ยน");
                  const file = e.target.files[0];
                  setFile(file);
                }}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {!file ? <div>เลือกรูปภาพ</div> : <div>{file.name}</div>}
              </label>
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
                onClick={changeProfilePhotoHandler}
              >
                เปลี่ยนภาพโปรไฟล์
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePhotURL: (path) => {
      dispatch(action.onUpdatePhotURL(path));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
