import React from "react";
import { connect } from "react-redux";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Rooms from "./Rooms";
import ChatBoard from "./ChatBoard";
import { Redirect } from "react-router-dom";

const Home = ({ data }) => {
  if (!data.loginStatus) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-10 mx-auto text-center">
            <Redirect to="/login" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-4 p-3 mt-4">
          <Rooms />
        </div>
        <div className="col-sm-8 mt-3">
          <ChatBoard />
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