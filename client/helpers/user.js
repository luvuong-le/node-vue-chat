import axios from "axios";
import store from "../store";
import _ from "lodash";

export const checkUserData = async () => {
  if (
    localStorage.getItem("session_id") &&
    _.isEmpty(store.getters.getUserData)
  ) {
    const res = await axios.get(
      `http://localhost:5000/api/user/${localStorage.getItem("session_id")}`,
      {
        headers: {
          Authorization: `bearer ${localStorage.getItem("authToken")}`
        }
      }
    );

    store.dispatch("saveUserData", res.data[0]);
    store.dispatch("toggleAuthState", true);
  }
};
