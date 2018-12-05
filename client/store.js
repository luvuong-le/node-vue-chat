import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authState: false,
        authUser: {},
        rooms: []
    },
    getters: {
        getUserData: state => state.authUser,
        getRoomData: state => state.rooms,
        isAuthorized: state => state.authState
    },
    mutations: {
        ASSIGN_USER_DATA: (state, payload) => {
            state.authUser = payload;
        },
        ASSIGN_ROOM_DATA: (state, payload) => {
            state.rooms = payload;
        },
        ADD_ROOM: (state, payload) => {
            state.rooms = [...state.rooms, payload];
        },
        DELETE_ROOM: (state, payload) => {
            state.rooms = state.rooms.filter(room => room._id !== payload._id);
        },
        TOGGLE_AUTH_STATE: (state, payload) => {
            state.authState = payload;
        }
    },
    actions: {
        saveUserData: (context, payload) => {
            context.commit('ASSIGN_USER_DATA', payload);
        },
        updateRoomData: (context, payload) => {
            context.commit('ASSIGN_ROOM_DATA', payload);
        },
        addRoom: (context, payload) => {
            context.commit('ADD_ROOM', payload);
        },
        deleteRoom: (context, payload) => {
            context.commit('DELETE_ROOM', payload);
        },
        toggleAuthState: (context, payload) => {
            context.commit('TOGGLE_AUTH_STATE', payload);
        }
    }
});
