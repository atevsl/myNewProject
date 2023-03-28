import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authSignUpUser =
  ({ email, password, displayName }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: displayName });
      const userRegistered = auth.currentUser;
      console.log("user in authSignInUser:", userRegistered);

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: userRegistered.uid,
          displayName: userRegistered.displayName,
          email: userRegistered.email,
          isUserIsFirebase: false,
        })
      );
    } catch (error) {
      console.log("error auth", auth);
      console.log("error error", error);
      console.log("error.message", error.message);
      authSlice.actions.updateUserProfile({
        userId: null,
        displayName: null,
        email: null,
        isUserIsFirebase: true,
      });
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;
      console.log("user in authSignInUser:", user);
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          displayName: user.displayName,
          email: user.email,
          isUserIsFirebase: false,
        })
      );
    } catch (error) {
      console.log("error auth", auth);
      console.log("error error", error);
      console.log("error.message", error.message);
      authSlice.actions.updateUserProfile({
        userId: null,
        displayName: null,
        email: null,
        isUserIsFirebase: true,
      });
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await auth.signOut();
  dispatch(authSlice.actions.authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await auth.onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        displayName: user.displayName,
        userId: user.uid,
      };

      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    }
  });
};
