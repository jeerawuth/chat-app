import database, { auth, googleProvider, storage } from "../database/database";
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
            storage
              .child("user-profiles")
              .child(user.uid)
              .child("photoURL")
              .getDownloadURL()
              .then((url) => {
                user.photoURL = url;
                dispatch({
                  type: actionType.GOOGLE_LOGIN,
                  payload: user,
                });
              })
              .catch((err) => {
                dispatch({
                  type: actionType.GOOGLE_LOGIN,
                  payload: user,
                });
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
        storage
          .child("user-profiles")
          .child(user.uid)
          .child("photoURL")
          .getDownloadURL()
          .then((url) => {
            user.photoURL = url;
            dispatch({
              type: actionType.EMAIL_LOGIN,
              payload: user,
            });
          })
          .catch((err) => {
            dispatch({
              type: actionType.EMAIL_LOGIN,
              payload: user,
            });
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
                displayName: user.displayName,
                photoURL: user.photoURL,
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

export const onSetCurrentRoom = (id) => {
  return (dispatch) => {
    const roomRef = database.collection("rooms").doc(id);
    roomRef.onSnapshot((doc) => {
      if (doc.data()) {
        dispatch({
          type: actionType.CURRENT_ROOM,
          payload: { id: doc.id, name: doc.data().name },
        });
      }
    });
  };
};
export const onSetDefaultRoom = () => {
  return (dispatch) => {
    const roomRef = database.collection("rooms").limit(1);
    roomRef.get().then((doc) => {
      if (doc.docs.length > 0) {
        const lastDoc = doc.docs[0];
        if (lastDoc.id && lastDoc.data().name) {
          const roomId = lastDoc.id;
          const roomName = lastDoc.data().name;
          dispatch({
            type: actionType.CURRENT_ROOM,
            payload: { id: roomId, name: roomName },
          });
        }
      }
    });
  };
};

export const onUpdatePhotURL = (path) => {
  return (dispatch) => {
    const user = auth.currentUser;
    user
      .updateProfile({
        displayName: user.displayName,
        photoURL: path,
      })
      .then(() => {
        dispatch({ type: actionType.UPDATE_IMAGE, payload: { path: path } });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const onSetLoading = () => {
  return { type: actionType.LOADING };
};
export const onClearMessage = () => {
  return { type: actionType.CLEAR_MESSAGE };
};
