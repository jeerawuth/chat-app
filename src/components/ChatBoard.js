import React from "react";
import { connect } from "react-redux";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ChatBoard = ({ data }) => {
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
      <div>You Login</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps)(ChatBoard);
