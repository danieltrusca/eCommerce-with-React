import userTypes from "./user.types";
import { auth, handleUserProfile, GoogleProvider } from "../../firebase/utils";

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const signInUser = ({ email, password }) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch({
      type: userTypes.SIGN_IN_SUCCESS,
      payload: true,
    });
  } catch (err) {
    //console.log(err);
  }
};

export const signOutUser = () => async (dispatch) => {
  try {
    auth.signOut();
    dispatch({
      type: userTypes.SIGN_OUT_USER_SUCCESS,
      payload: true,
    });
  } catch (err) {
    //console.log(err);
  }
};

export const signUpUser = ({
  displayName,
  email,
  password,
  confirmPassword,
}) => async (dispatch) => {
  if (!displayName || !email || !password || !confirmPassword) {
    const err = ["all fields are required"];

    dispatch({
      type: userTypes.SIGN_UP_ERRORS,
      payload: err,
    });
    return;
  }
  if (password !== confirmPassword) {
    const err = ["passwords does not match"];
    dispatch({
      type: userTypes.SIGN_UP_ERRORS,
      payload: err,
    });
    return;
  }

  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await handleUserProfile(user, { displayName });
    dispatch({
      type: userTypes.SIGN_UP_SUCCESS,
      payload: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = ({ email }) => async (dispatch) => {
  const config = {
    url: "http://localhost:3000/login",
  };
  try {
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        dispatch({
          type: userTypes.RESET_PASSWORD_SUCCESS,
          payload: true,
        });
      })
      .catch(() => {
        const errors = ["Email not found! Please, try again!"];
        dispatch({
          type: userTypes.RESET_PASSWORD_ERROR,
          payload: errors,
        });
      });
  } catch (err) {
    //console.log(err);
  }
};

export const resetAllAuthForm = () => ({
  type: userTypes.RESET_AUTH_FORMS,
});

export const resetUserState = () => ({
  type: userTypes.RESET_USER_STATE,
});

export const signInWithGoogle = () => async (dispatch) => {
  try {
    await auth.signInWithPopup(GoogleProvider).then(() => {
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true,
      });
    });
  } catch (err) {
    //console.log(err);
  }
};
