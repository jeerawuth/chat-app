import React from "react";
import { connect } from "react-redux";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Rooms from "./Rooms";
import ChatBoard from "./ChatBoard";

const Home = ({ data }) => {
  if (!data.loginStatus) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-10 mx-auto text-center">
            <div className="display-4">Home Component</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 mx-auto text-center">
          <div className="display-4">Home Component</div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 mx-auto text-center">
          <div className="text-success p-3">You Login Already!!</div>
          <div className="row">
            <div className="col-sm-4 p-3">
              <Rooms />
            </div>
            <div className="col-sm-8">
              <ChatBoard />
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

export default connect(mapStateToProps)(Home);
