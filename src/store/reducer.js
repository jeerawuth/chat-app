import { actionType } from "../utils/share";
const initialState = {
  data: {
    loginStatus: false,
    user: {},
    currentRoom: { id: null, name: null },
  },
  loading: false,
  message: { code: "", message: "", type: "" },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GOOGLE_LOGIN:
      const gLoginState = {
        data: {
          loginStatus: true,
          user: action.payload,
          currentRoom: { id: null, name: null },
        },
        loading: true,
        message: state.message,
      };
      return gLoginState;
    case actionType.LOGOUT:
      const logoutState = {
        data: {
          loginStatus: false,
          user: {},
          currentRoom: { id: null, name: null },
        },
        loading: false,
        message: state.message,
      };
      return logoutState;
    case actionType.EMAIL_LOGIN:
      const eLoginState = {
        data: {
          loginStatus: true,
          user: action.payload,
          currentRoom: { id: null, name: null },
        },
        loading: true,
        message: state.message,
      };
      return eLoginState;
    case actionType.EMAIL_SIGNUP:
      const eSignUpState = {
        data: {
          loginStatus: false,
          user: action.payload,
          currentRoom: { id: null, name: null },
        },
        loading: true,
        message: state.message,
      };
      return eSignUpState;
    case actionType.ERROR:
      const errorState = {
        data: {
          loginStatus: false,
          user: {},
          currentRoom: { id: null, name: null },
        },
        loading: false,
        message: {
          code: action.payload.code,
          message: action.payload.message,
          type: "error",
        },
      };
      return errorState;
    case actionType.SUCCESS:
      const successState = {
        data: {
          loginStatus: state.data.loginStatus,
          user: state.data.user,
          currentRoom: { id: null, name: null },
        },
        loading: false,
        message: {
          code: action.payload.code,
          message: action.payload.message,
          type: "success",
        },
      };
      return successState;
    case actionType.LOADING:
      const loading = {
        data: state.data,
        loading: true,
        message: { code: "", message: "", type: "" },
      };
      return loading;
    case actionType.CLEAR_MESSAGE:
      const clearObj = {
        data: state.data,
        loading: state.loading,
        message: { code: "", message: "", type: "" },
      };
      return clearObj;

    case actionType.CURRENT_ROOM:
      const chooseRoomObj = {
        data: {
          loginStatus: state.data.loginStatus,
          user: state.data.user,
          currentRoom: {
            id: action.payload.id,
            name: action.payload.name,
          },
        },
        loading: state.loading,
        message: state.message,
      };
      return chooseRoomObj;
    case actionType.DELETE_ROOM:
      const deleteObj = {
        data: {
          loginStatus: state.data.loginStatus,
          user: state.data.user,
          currentRoom: {
            id: null,
            name: null,
          },
        },
        loading: state.loading,
        message: state.message,
      };
      return deleteObj;
    case actionType.UPDATE_IMAGE:
      const newUser = { ...state.data.user };
      newUser.photoURL = action.payload.path;
      const newUserObj = {
        data: {
          loginStatus: state.data.loginStatus,
          user: newUser,
          currentRoom: state.data.currentRoom,
        },
        loading: state.loading,
        message: state.message,
      };
      return newUserObj;
    default:
      return state;
  }
};
export default reducer;
