import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionType } from "../utils/share";
// import "bootstrap/dist/css/bootstrap.min.css";
const Header = ({ data, onLogout }) => {
  const status = data.loginStatus;
  const [pic, setPic] = useState(require("../assets/logo.png"));
  useEffect(() => {
    setPic(data.user.photoURL);
  }, [data.user.photoURL]);

  return (
    <div className="row mt-4">
      <div className="col-sm-10 mx-auto">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {status ? (
                <li className="nav-item active">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
              ) : null}
            </ul>
            <ul className="navbar-nav">
              {!status ? (
                <li className="nav-item mr">
                  <Link className="nav-link" to="/signup">
                    ลงทะเบียน
                  </Link>
                </li>
              ) : null}
              {!status ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    เข้าสู่ระบบ
                  </Link>
                </li>
              ) : null}
              {status ? (
                <li className="nav-item mr">
                  <Link
                    className="nav-link"
                    onClick={() => onLogout()}
                    to="/login"
                  >
                    <i
                      className="fas fa-sign-out-alt primary"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Sign Out"
                    ></i>
                  </Link>
                </li>
              ) : null}
              {status ? (
                <div>
                  {data.user.displayName}{" "}
                  <img
                    src={pic}
                    alt="user"
                    width="40"
                    height="40"
                    className="img mr-1 rounded-circle"
                  />
                </div>
              ) : null}
            </ul>
          </div>
        </nav>
      </div>
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
    onLogout: () => {
      dispatch({ type: actionType.LOGOUT });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
