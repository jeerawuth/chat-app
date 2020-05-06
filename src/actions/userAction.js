import database, { auth, googleProvider } from "../database/database";
import { actionType } from "../utils/share";
import md5 from "md5";
export const onGoogleLogin = () => {
  return (dispatch) => {
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        const user = result.user;
        const usersRef = database.collection("users").doc(user.uid);

        usersRef.get().then((docSnapshot) => {
          if (docSnapshot.exists) {
            console.log("user exiting");
            dispatch({
              type: actionType.GOOGLE_LOGIN,
              payload: user,
            });
          } else {
            console.log("create new user");
            usersRef
              .set({
                name: user.displayName,
                avatar: user.photoURL,
              })
              .then(() => {
                dispatch({
                  type: actionType.GOOGLE_LOGIN,
                  payload: user,
                });
              });
          }
        });
      })
      .catch((err) => {
        const errObj = {
          code: err.code,
          message: err.message,
          type: "error",
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
        const user = result.user;
        user
          .updateProfile({
            displayName: user.email.substring(0, email.lastIndexOf("@")),
            photoURL: `http://gravatar.com/avatar/${md5(
              user.email
            )}?d=identicon`,
          })
          .then(() => {
            const usersRef = database.collection("users").doc(user.uid);
            usersRef
              .set({
                name: user.displayName,
                avatar: user.photoURL,
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
                };
                dispatch({
                  type: actionType.SUCCESS,
                  payload: successObj,
                });
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
