import React, { useState } from "react";
import { connect } from "react-redux";
const EditRoom = ({ editRoomById, getRoomById, id }) => {
  const [editName, setEditName] = useState("");
  const [editDetails, setEditDetails] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const onEditHandler = () => {
    editRoomById(id, editName, editDetails).then(() => {
      console.log("edit ok");
    });
  };
  const formDisabled = () => {
    if (editName === "" || editDetails === "") {
      return true;
    }
  };
  return (
    <div className="d-flex justify-content-start align-items-center">
      <div
        className="btn btn-sm btn-info"
        data-toggle="modal"
        data-target={`#editModal${id}`}
        onClick={() => {
          setEditLoading(true);
          getRoomById(id).then((result) => {
            setEditName(result.data().name);
            setEditDetails(result.data().details);
            setEditLoading(false);
          });
        }}
      >
        <i className="fas fa-edit"></i>
      </div>
      <div
        className="modal fade"
        id={`editModal${id}`}
        tabIndex="-2"
        role="dialog"
        aria-labelledby="addRoomLabel"
        aria-hidden="true"
      >
        {editLoading ? (
          <i
            className="fas fa-spinner fa-pulse fa-3x"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: "1",
            }}
          ></i>
        ) : (
          <div
            className="modal-dialog"
            role="document"
            style={{ maxWidth: 300 }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addRoomLabel">
                  แก้ไขห้อง
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
                      className={
                        editName !== ""
                          ? "form-control"
                          : "form-control is-invalid"
                      }
                      placeholder="กรอกชื่อห้อง"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                    <div className="invalid-feedback">กรุณากรอกชื่อห้อง</div>
                  </div>
                  <div className="form-group">
                    <label>รายละเอียดของห้อง</label>
                    <textarea
                      className={
                        editDetails !== ""
                          ? "form-control"
                          : "form-control is-invalid"
                      }
                      rows="3"
                      value={editDetails}
                      onChange={(e) => setEditDetails(e.target.value)}
                    ></textarea>
                    <div className="invalid-feedback">
                      กรุณากรอกรายละเอียดห้อง
                    </div>
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
                  onClick={onEditHandler}
                  disabled={formDisabled()}
                >
                  แก้ไขห้อง
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};
export default connect(mapStateToProps)(EditRoom);
