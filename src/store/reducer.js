import { actionType } from "../utils/share";
const initialState = {
  data: {
    loginStatus: false,
    user: {},
    message: {},
    loading: false,
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
          loginStatus: state.loginStatus,
          user: state.user,
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
    default:
      return state;
  }
};
export default reducer;
