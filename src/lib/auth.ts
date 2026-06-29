
import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  UserInfo,
  signInWithRedirect,
  getRedirectResult
} from "firebase/auth";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google: ", error);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

export const getRedirectResultAfterSignIn = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      return { user, token };
    }
    return { user: null, token: null };
  } catch (error) {
    console.error("Error getting redirect result: ", error);
    return { user: null, token: null };
  }
}

export const onAuthStateChangedHelper = (callback: (user: UserInfo | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
