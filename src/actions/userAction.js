import { auth, googleProvider } from "../database/database";
import { actionType } from "../utils/share";
import md5 from "md5";
export const onGoogleLogin = () => {
  return (dispatch) => {
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        const user = result.user;
        dispatch({
          type: actionType.GOOGLE_LOGIN,
          payload: user,
        });
      })
      .catch((err) => {
        const errObj = {
          code: err.code,
          message: err.message,
          type: "error",
          description: err.message,
          classType: "error",
        };
        dispatch({
          type: actionType.ERROR,
          payload: errObj,
        });
      });
  };
};
export const onLogout = () => {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch({ type: actionType.LOGOUT });
      })
      .catch((err) => {
        const errObj = {
          code: err.code,
          message: err.message,
          type: "error",
          description: err.message,
          classType: "error",
        };
        dispatch({
          type: actionType.ERROR,
          payload: errObj,
        });
      });
  };
};
export const onEmailLogin = (email, password) => {
  return (dispatch) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        dispatch({
          type: actionType.EMAIL_LOGIN,
          payload: user,
        });
      })
      .catch((err) => {
        const errObj = {
          code: err.code,
          message: err.message,
          type: "error",
          description: err.message,
          classType: "error",
        };
        dispatch({
          type: actionType.ERROR,
          payload: errObj,
        });
      });
  };
};
export const onEmailSignUp = (email, password) => {
  return (dispatch) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        const user = result.user;
        user
          .updateProfile({
            displayName: "",
            photoURL: `http://gravatar.com/avatar/${md5(
              user.email
            )}?d=identicon`,
          })
          .then(() => {
            dispatch({
              type: actionType.EMAIL_SIGNUP,
              payload: user,
            });
            const successObj = {
              code: "auth/email-signup-success",
              message: "ลงทะเบียนเรียบร้อยแล้ว",
              type: "success",
              description: "ลงทะเบียนเรียบร้อยแล้ว",
              classType: "success",
            };
            dispatch({
              type: actionType.SUCCESS,
              payload: successObj,
            });
          });
      })
      .catch((err) => {
        const errObj = {
          code: err.code,
          message: err.message,
          type: "error",
          description: err.message,
          classType: "error",
        };
        dispatch({
          type: actionType.ERROR,
          payload: errObj,
        });
      });
  };
};
export const onSetLoading = () => {
  return { type: actionType.LOADING };
};
export const onClearMessage = () => {
  return { type: actionType.CLEAR_MESSAGE };
};
