import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import database, { storage } from "../database/database";
import * as action from "../actions/userAction";
const Profile = ({ data, onUpdatePhotURL }) => {
  const userRef = database.collection("users").doc(`${data.user.uid}`);
  const [file, setFile] = useState(null);
  const [fileErrorMessage, setFileErrorMessage] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  const [progress, setProgress] = useState(5);
  const [progressStatus, setProgressStatus] = useState(false);
  const imageAllow = ["image/jpeg", "image/png"];
  useEffect(() => {
    setPhotoURL(data.user.photoURL);
  }, [data.user.photoURL]);
  const checkImageContentType = (blob) => {
    if (imageAllow.indexOf(blob.type) !== -1) {
      return true;
    }
    setFile(null);
    return false;
  };
  const changeProfilePhotoHandler = () => {
    setFileErrorMessage("");
    if (checkImageContentType(file)) {
      setProgressStatus(true);
      const uploadTask = storage
        .child("user-profiles")
        .child(`${data.user.uid}`)
        .child("photoURL")
        .put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          console.log(error);
        },
        () => {
          setProgressStatus(false);
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            userRef.update({ photoURL: downloadURL }).then(() => {
              onUpdatePhotURL(downloadURL); //from dispatch to prop
            });
          });
        }
      );
    } else {
      setFileErrorMessage("ไฟล์ที่อนุญาต JPEG และ PNG");
    }
  };
  if (!data.loginStatus) {
    return (
      <div className="container">
        <Redirect to="/login" />
      </div>
    );
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-10 mx-auto text-center">
          <div className="display-4 mt-3">สวัสดี: {data.user.displayName}</div>
          {photoURL ? (
            <img
              className="rounded float-center"
              src={photoURL}
              alt="user"
              width="30%"
              style={{ maxHeight: "300" }}
            />
          ) : null}
        </div>
      </div>
      {fileErrorMessage !== "" ? (
        <div className="row">
          <div className="alert-warning p-2 col-sm-6 mx-auto text-center">
            {fileErrorMessage}
          </div>
        </div>
      ) : null}
      <div className="row">
        <div className="col-sm-10 mx-auto text-center">
          <div className="text-success p-3">
            <div className="custom-file col-sm-10 mx-auto text-center">
              <div className="input-group d-flex flex-row justify-content-center">
                <div
                  className="btn btn-sm btn-success text-center"
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
      {progressStatus ? (
        <div className="row">
          <div className="col-sm-6 mx-auto">
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped bg-info"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      ) : null}
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
