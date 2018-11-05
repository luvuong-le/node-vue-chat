import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

/** Axios Request Intercept */
axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

/** Axios Response Intercept */
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(err) {
    if (err.response.status === 401) {
      localStorage.removeItem("authToken");
      router.push({ name: "Login" });
    }
    if (err.response.status === 404) {
      router.push({
        name: "UserProfile",
        params: { username: store.getters.getUserData.username }
      });
    }
    return Promise.reject(err);
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
