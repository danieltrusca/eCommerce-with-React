import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  signInSuccess: false,
  signUpSuccess: false,
  signUpErrors: [],
  resetPasswordSuccess: false,
  resetPasswordErrors: [],
  signOutSuccess: false,
  //   resetPasswordSuccess: false,
  //   userErr: []
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        signInSuccess: action.payload,
      };
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        currentUser: null,
        signInSuccess: false,
        signUpSuccess: false,
        signUpErrors: [],
        resetPasswordSuccess: false,
        resetPasswordErrors: [],
        signOutSuccess: action.payload,
      };
    case userTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpSuccess: action.payload,
      };
    case userTypes.SIGN_UP_ERRORS:
      return {
        ...state,
        signUpErrors: action.payload,
      };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
      };
    case userTypes.RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetPasswordErrors: action.payload,
      };
    case userTypes.RESET_USER_STATE:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    case userTypes.RESET_AUTH_FORMS:
      return {
        ...state,
        signInSuccess: false,
        signUpSuccess: false,
        signUpErrors: [],
        resetPasswordSuccess: false,
        resetPasswordErrors: [],
      };
    default:
      return state;
  }
};

export default userReducer;
