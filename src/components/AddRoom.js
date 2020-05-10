import React, { useState } from "react";
import { connect } from "react-redux";
const AddRoom = ({ addRoom }) => {
  const [addName, setAddName] = useState("");
  const [addDetails, setAddDetails] = useState("");
  const addRoomHandler = () => {
    addRoom(addName, addDetails).then(() => {
      setAddName("");
      setAddDetails("");
      console.log("add ok");
    });
  };
  const formDisabled = () => {
    if (addName === "" || addDetails === "") {
      return true;
    }
  };
  return (
    <div>
      <div
        className="btn btn-sm btn-primary"
        data-toggle="modal"
        data-target="#addModal"
      >
        <i className="fas fa-plus"></i>
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
                    className={
                      addName !== ""
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    placeholder="กรอกชื่อห้อง"
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>รายละเอียดของห้อง</label>
                  <textarea
                    className={
                      addDetails !== ""
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    rows="3"
                    value={addDetails}
                    onChange={(e) => setAddDetails(e.target.value)}
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
                onClick={addRoomHandler}
                disabled={formDisabled()}
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
export default connect(mapStateToProps)(AddRoom);
