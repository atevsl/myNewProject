import { auth } from "../../firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getSatte) => {
    console.log("email, password, login", email, password, login);
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log("user in authSignUpUser:", user);
        }
      );

      console.log("user", user);
    } catch (error) {
      console.log("auth", auth);
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

const authSignInUser = () => async (dispatch, getState) => {};

const authSignOutUser = () => async (dispatch, getState) => {};
