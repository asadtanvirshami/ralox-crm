import { atom } from "jotai";
import Cookies from "js-cookie";

// Initialize user data from cookies or set default values
const userDataCache = Cookies.get("user");
const initialUserData = userDataCache ? JSON.parse(userDataCache) : {
    user: null,
  };
// Atom to store user data with persistence
export const userAtom = atom(initialUserData, (get, set, newUserData) => {
  // Update the atom value
  set(userAtom, newUserData);

  // Update cookies
  Cookies.set("user", newUserData);
});
