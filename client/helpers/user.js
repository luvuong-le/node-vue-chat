import store from "../store";
import _ from "lodash";

export const checkUserData = () => {
  if (
    localStorage.getItem("session_id") &&
    _.isEmpty(store.getters.getUserData)
  ) {
    const userData = localStorage.getItem("user");

    store.dispatch("saveUserData", JSON.parse(userData));
    store.dispatch("toggleAuthState", true);
  }
};
