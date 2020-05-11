import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as action from "../../actions/userAction";
import { Redirect } from "react-router-dom";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { actionType, codeLists } from "../../utils/share";
const UserSignup = ({
  onEmailSignup,
  onLoading,
  onClearMessage,
  onGoogleLogin,
  data,
  storeLoading,
  storeMessage,
  history,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [formElements, setFormElements] = useState({
    email: {
      type: "email",
      value: "",
      validator: {
        required: true,
        pattern: "email",
      },
      touched: false,
      error: { status: true, message: "" },
    },
    password: {
      type: "password",
      value: "",
      validator: {
        required: true,
        minLength: 6,
      },
      touched: false,
      error: { status: true, message: "" },
    },
    confirmPassword: {
      type: "confirmPassword",
      value: "",
      validator: {
        required: true,
        minLength: 6,
      },
      touched: false,
      error: { status: true, message: "" },
    },
  });
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
  }, [storeMessage, message]);

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
    if (checkValidator() && checkConfirmPassword()) {
      e.preventDefault();
      onLoading(); // tell store to start loading
      onEmailSignup(email, password);
    }
  };

  const onFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let updatedForm = { ...formElements };
    updatedForm[name].value = value;
    updatedForm[name].touched = true;
    const validatorObject = checkValidator(value, updatedForm[name].validator);
    updatedForm[name].error = {
      status: validatorObject.status,
      message: validatorObject.message,
    };
    let formStatus = true;
    for (let name in updatedForm) {
      if (updatedForm[name].validator.required === true) {
        formStatus = !updatedForm[name].error.status && formStatus;
      }
    }
    setFormElements(updatedForm);
    setFormValid(formStatus);
  };
  const checkConfirmPassword = () => {
    if (password === confirmPassword) {
      return true;
    }
    return false;
  };

  const checkValidator = (value = "", rule = {}) => {
    let valid = true;
    let message = "";
    if (value.trim().length === 0 && rule.required) {
      valid = false;
      message = "จำเป็นต้องกรอก";
    }
    if (value.length < rule.minLength && valid) {
      valid = false;
      message = `น้อยกว่า ${rule.minLength} ตัวอักษร`;
    }
    if (value.length > rule.maxLength && valid) {
      valid = false;
      message = `มากกว่า ${rule.maxLength} ตัวอักษร`;
    }
    if (rule.pattern === "email" && valid) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) === false) {
        valid = false;
        message = "กรอกอีเมล์ไม่ถูกต้อง";
      }
    }
    return { status: !valid, message: message };
  };
  const getInputClass = (name) => {
    const elementErrorStatus = formElements[name].error.status;
    if (!formElements[name].touched) {
      return ["form-control"];
    } else {
      return elementErrorStatus && formElements[name].touched
        ? "form-control is-invalid"
        : "form-control";
    }
  };
  const getErrorMessage = (name) => {
    return formElements[name].error.message;
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    for (let name in formElements) {
      formData[name] = formElements[name].value;
    }
  };
  const cancelHandler = () => {
    setEmail("");
    setPassword("");
    onClearMessage();
  };
  const gotoLoginHandler = () => {
    onClearMessage();
    history.push("/login");
  };

  if (!data.loginStatus) {
    return (
      <div className="container">
        <div className="modal-dialog row" role="document">
          <div className="modal-content col-12">
            <div className="card-header">
              <div className="p-2 text-center">
                <h5>เลือกวิธีลงทะเบียน</h5>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6 mx-auto">
                  <button
                    type="button"
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#targetModal"
                    style={{ width: "100%" }}
                  >
                    ลงทะเบียนด้วยอีเมล
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
                  src={require("../../assets/logo.png")}
                  alt="logo"
                  className="card-img"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "scale-down",
                  }}
                />
                {messageTag}
                <form onSubmit={onFormSubmit} autoComplete="off">
                  {storeMessage.type !== "success" ? (
                    <div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className={
                            storeMessage.code.indexOf("email") !== -1
                              ? "form-control is-invalid"
                              : getInputClass("email")
                          }
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyUp={onFormChange}
                          onFocus={onClearMessage}
                        />
                        <div className="invalid-feedback">
                          {getErrorMessage("email")}
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className={
                            !checkConfirmPassword() ||
                            storeMessage.code.indexOf("password") !== -1
                              ? "form-control is-invalid"
                              : getInputClass("password")
                          }
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyUp={onFormChange}
                          onFocus={onClearMessage}
                        />
                        <div className="invalid-feedback">
                          {!checkConfirmPassword()
                            ? "รหัสผ่านไม่ตรงกัน"
                            : getErrorMessage("confirmPassword")}
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="confirmPassword">
                          Confirm password
                        </label>
                        <input
                          type="password"
                          className={
                            !checkConfirmPassword() ||
                            storeMessage.code.indexOf("password") !== -1
                              ? "form-control is-invalid"
                              : getInputClass("confirmPassword")
                          }
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                          }}
                          onKeyUp={onFormChange}
                        />
                        <div className="invalid-feedback">
                          {!checkConfirmPassword()
                            ? "รหัสผ่านไม่ตรงกัน"
                            : getErrorMessage("confirmPassword")}
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {storeMessage.type !== "success" ? (
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
                          disabled={
                            !formValid ||
                            storeMessage.type === "error" ||
                            !checkConfirmPassword()
                          }
                        >
                          ลงทะเบียน
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="row card-footer flex-column-reverse flex-sm-row">
                      <div className="col-sm-6">
                        <button
                          className="btn btn-secondary mt-1"
                          data-dismiss="modal"
                          style={{ width: "100%" }}
                          onClick={cancelHandler}
                        >
                          ปิด
                        </button>
                      </div>
                      <div className="col-sm-6">
                        <button
                          className="btn btn-primary mt-1"
                          style={{ width: "100%" }}
                          data-dismiss="modal"
                          onClick={() => gotoLoginHandler()}
                        >
                          ไปหน้าเข้าสู่ระบบ
                        </button>
                      </div>
                    </div>
                  )}
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
    onEmailSignup: (email, password) => {
      dispatch(action.onEmailSignUp(email, password));
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
export default connect(mapStateToProps, mapDispatchToProps)(UserSignup);
