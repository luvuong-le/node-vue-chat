import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authState: false,
        authUser: {}
    },
    getters: {
        getUserData: state => {
            return state.authUser;
        },
        isAuthorized: state => state.authState
    },
    mutations: {
        ASSIGN_USER_DATA: (state, payload) => {
            state.authUser = payload;
        },
        TOGGLE_AUTH_STATE: (state, payload) => {
            state.authState = payload;
        }
    },
    actions: {
        saveUserData: (context, payload) => {
            context.commit('ASSIGN_USER_DATA', payload);
        },
        toggleAuthState: (context, payload) => {
            context.commit('TOGGLE_AUTH_STATE', payload);
        }
    }
});
