import _ from 'lodash';
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from '@/components/auth/Login.vue';
import Register from '@/components/auth/Register.vue';
import UserProfile from '@/components/user/UserProfile.vue';
import EditUserProfile from '@/components/user/EditUserProfile.vue';
import RoomList from '@/components/room/RoomList.vue';
import { checkUserData } from './helpers/user';
import store from './store';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            props: true,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            props: true,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/user/:username',
            name: 'UserProfile',
            component: UserProfile,
            props: true,
            meta: {
                requiresAuth: true,
                transitionName: 'router-anim',
                enterActive: 'animated fadeIn'
            }
        },
        {
            path: '/user/edit/:username?',
            name: 'EditUserProfile',
            component: EditUserProfile,
            props: true,
            meta: {
                requiresAuth: true,
                transitionName: 'router-anim',
                enterActive: 'animated fadeIn'
            }
        },
        {
            path: '/rooms',
            name: 'RoomList',
            component: RoomList,
            meta: {
                requiresAuth: true,
                transitionName: 'router-anim',
                enterActive: 'animated fadeIn'
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    checkUserData();
    if (to.meta.requiresAuth) {
        if (localStorage.getItem('authToken') === null) {
            next({
                name: 'Login',
                params: { message: 'You are unauthorized, Please login to access' }
            });
        } else {
            next();
        }
    } else if (!_.isEmpty(to.meta) && !to.meta.requiresAuth) {
        if (localStorage.getItem('session_id')) {
            next({
                name: 'UserProfile',
                params: { username: store.getters.getUserData.username }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
