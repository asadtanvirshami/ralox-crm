import { atom } from "jotai";
import Cookies from "js-cookie";

// Initialize user data from cookies or set default values
const unitDataCache = Cookies.get("unit");
const initialUnitData = unitDataCache
  ? JSON.parse(unitDataCache)
  : {
      user: null,
    };
// Atom to store user data with persistence
export const unitAtom = atom(initialUnitData, (get, set, newUnitData) => {
  // Update the atom value
  set(unitAtom, newUnitData);

  // Update cookies
  Cookies.set("unit", newUnitData);

  // Update local storage
  localStorage.setItem("unit", JSON.stringify(newUnitData));
});
