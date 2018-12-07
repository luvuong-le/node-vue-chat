import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import io from 'socket.io-client';
import setAuthToken from './utils/authToken';

Vue.config.productionTip = false;
Vue.config.ignoredElements = ['ion-icons', /^ion-/];

/** Socket IO Client - Store in Vuex State for use in components */
const socket = io('http://localhost:5000');
store.dispatch('assignSocket', socket);

// socket.on('socketIORoom', data => {
//     console.log(data);
// });

// socket.emit('hello_world', { hello: 'world' });

/** Check for auth token on refresh and set authorization header for incoming requests */
if (localStorage.authToken) {
    setAuthToken(localStorage.authToken);
}

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
            localStorage.removeItem('authToken');
            store.dispatch('TOGGLE_AUTH_STATE', false);
            router.push({
                name: 'Login',
                params: { message: 'Session has expired, please login again' }
            });
        }
        return Promise.reject(err);
    }
);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
