import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authState: false,
        authUser: {},
        currentRoom: null,
        rooms: [],
        socket: null
    },
    getters: {
        getUserData: state => state.authUser,
        getRoomData: state => state.rooms,
        isAuthorized: state => state.authState,
        getSocket: state => state.socket,
        getCurrentRoom: state => state.currentRoom
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
        SAVE_CURRENT_ROOM: (state, payload) => {
            state.currentRoom = payload;
        },
        DELETE_ROOM: (state, payload) => {
            state.currentRoom = null;
            state.rooms = state.rooms.filter(room => room._id !== payload._id);
        },
        TOGGLE_AUTH_STATE: (state, payload) => {
            state.authState = payload;
        },
        ASSIGN_SOCKET: (state, payload) => {
            state.socket = payload;
        },
        LEAVE_ROOM: (state, payload) => {
            state.currentRoom.users = payload;
        },
        REMOVE_ACCESS_ID: (state, payload) => {
            state.currentRoom = payload;
        },
        RESET_STATE: state => {
            state.authState = false;
            state.authUser = {};
            state.currentRoom = null;
            state.rooms = [];
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
        },
        assignSocket: (context, payload) => {
            context.commit('ASSIGN_SOCKET', payload);
        },
        saveCurrentRoom: (context, payload) => {
            context.commit('SAVE_CURRENT_ROOM', payload);
        },
        leaveRoom: (context, payload) => {
            context.commit('REMOVE_USER_ID', payload);
        },
        removeAccessId: (context, payload) => {
            context.commit('REMOVE_ACCESS_ID', payload);
        },
        deleteUserAccount: context => {
            axios.delete('/api/user/current').then(() => {
                context.commit('RESET_STATE');
                localStorage.clear();
                router.push({ name: 'Login' });
            });
        }
    }
});
