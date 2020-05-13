import React from "react";

const DeleteRoom = ({ deleteRoomById, roomName, id }) => {
  return (
    <div className="container">
      <div
        className="btn btn-sm btn-danger"
        data-toggle="modal"
        data-target={`#delete${id}`}
      >
        <i className="fas fa-trash"></i>
      </div>
      <div
        className="modal fade"
        id={`delete${id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document" style={{ maxWidth: 300 }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteLabel">
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
              <div className="text-secondary">
                ยืนยันการลบห้อง <span className="text-danger">{roomName}</span>{" "}
                ข้อมูลการแชตต่างๆ จะไม่สามารถใช้งานได้
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
                onClick={() => {
                  deleteRoomById().then(() => {
                    console.log("delete ok");
                  });
                }}
              >
                ลบห้อง
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRoom;
