import { auth } from "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authSlice } from "./authReducer";

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getSatte) => {
    console.log("email, password, login", email, password, login);
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
          console.log("user in authSignUpUser:", user);
        }
      );

      // console.log("user in ", user);
    } catch (error) {
      console.log("error auth", auth);
      console.log("error error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
          console.log("user in authSignInUser:", user);
        }
      );

      // console.log("user", user);
    } catch (error) {
      console.log("error auth", auth);
      console.log("error error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {};
