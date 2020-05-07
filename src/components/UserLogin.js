import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as action from "../actions/userAction";
import { Link, Redirect } from "react-router-dom";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { actionType, codeLists } from "../utils/share";
const UserLogin = ({
  onLoading,
  onClearMessage,
  onEmailLogin,
  onGoogleLogin,
  data,
  storeLoading,
  storeMessage,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (storeMessage.message.length > 0) {
      const code = storeMessage.code;
      if (codeLists[code]) {
        setMessage(codeLists[code]);
      } else {
        setMessage(storeMessage.message);
      }
    } else {
      setMessage("");
    }
  }, [storeMessage]);
  let messageTag = null; // prepare jsx for display message
  if (storeMessage.type === "error") {
    messageTag = (
      <div className="alert-danger mb-1 mt-1 p-2 text-center">{message}</div>
    );
  } else if (storeMessage.type === "success") {
    messageTag = (
      <div className="alert-success mb-1 mt-1 p-2 text-center">{message}</div>
    );
  }
  const emailLoginHandler = (e) => {
    if (checkValidator()) {
      e.preventDefault();
      onLoading(); // tell store to start loading
      onEmailLogin(email, password);
    }
  };
  const checkValidator = () => {
    if (email !== "" && password !== "") {
      return true;
    }
    return false;
  };
  const cancelHandler = () => {
    setEmail(""); // clear form
    setPassword("");
    onClearMessage(); // clear message at store
  };
  if (!data.loginStatus) {
    return (
      <div className="container">
        {storeMessage.type === "success" ? (
          <div className="col-6 mx-auto">
            <div className="alert-secondary mb-1 mt-1 p-2 text-center">
              {message}
              <Link to="/profile">ไปยังหน้าโปรไฟล์</Link>
            </div>
          </div>
        ) : null}
        <div className="modal-dialog row" role="document">
          <div className="modal-content col-12">
            <div className="card-header">
              <div className="p-2 text-center">
                <h5>เลือกวิธีเข้าสู่ระบบ</h5>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6 mx-auto">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#targetModal"
                    style={{ width: "100%" }}
                  >
                    เข้าสู่ระบบด้วยอีเมล
                  </button>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-6 mx-auto">
                  <button
                    className="btn btn-warning"
                    onClick={() => onGoogleLogin()}
                    style={{ width: "100%" }}
                  >
                    Google Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="targetModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog row" role="document">
            <div className="modal-content col-10 mx-auto">
              {storeLoading ? (
                <i
                  className="fas fa-spinner fa-pulse fa-3x"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "44%",
                    transform: "translate(-50%, -50%)",
                    opacity: "1",
                  }}
                ></i>
              ) : null}
              <div className="card-body">
                <img
                  src={require("../assets/logo.png")}
                  alt="logo"
                  className="card-img"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "scale-down",
                  }}
                />
                {messageTag}
                <form autoComplete="off">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className={
                        storeMessage.code.indexOf("email") !== -1
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={onClearMessage}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className={
                        storeMessage.code.indexOf("password") !== -1
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={onClearMessage}
                    />
                  </div>
                  <div className="row card-footer flex-column-reverse flex-sm-row">
                    <div className="col-sm-6">
                      <button
                        className="btn btn-secondary mt-1"
                        data-dismiss="modal"
                        style={{ width: "100%" }}
                        onClick={cancelHandler}
                      >
                        ยกเลิก
                      </button>
                    </div>
                    <div className="col-sm-6">
                      <button
                        type="submit"
                        className="btn btn-primary mt-1"
                        style={{ width: "100%" }}
                        onClick={emailLoginHandler}
                        disabled={!checkValidator()}
                      >
                        เข้าสู่ระบบ
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Redirect to="/profile" />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    data: state.data,
    storeLoading: state.loading,
    storeMessage: state.message,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onEmailLogin: (email, password) => {
      dispatch(action.onEmailLogin(email, password));
    },
    onGoogleLogin: () => {
      dispatch(action.onGoogleLogin());
    },
    onLoading: () => {
      dispatch({ type: actionType.LOADING });
    },
    onClearMessage: () => {
      dispatch({ type: actionType.CLEAR_MESSAGE });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
