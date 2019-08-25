import _ from 'lodash';
import Vue from 'vue';
import Router from 'vue-router';
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
            component: () => import('@/views/Home.vue'),
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/about',
            name: 'About',
            component: () => import('@/views/About.vue'),
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/components/auth/Login.vue'),
            props: true,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/components/auth/Register.vue'),
            props: true,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/profile/:handle',
            name: 'Profile',
            component: () => import('@/components/profile/Profile.vue'),
            meta: {
                requiresAuth: true,
                transitionName: 'router-anim',
                enterActive: 'animated fadeIn'
            }
        },
        {
            path: '/user/:handle',
            name: 'UserProfile',
            component: () => import('@/components/user/UserProfile.vue'),
            props: true,
            meta: {
                requiresAuth: true,
                transitionName: 'router-anim',
                enterActive: 'animated fadeIn'
            }
        },
        {
            path: '/user/:handle/edit',
            name: 'EditUserProfile',
            component: () => import('@/components/user/EditUserProfile.vue'),
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
            component: () => import('@/components/room/RoomList.vue'),
            props: true,
            meta: {
                requiresAuth: true,
                transitionName: 'router-anim',
                enterActive: 'animated fadeIn'
            }
        },
        {
            path: '/room/:id',
            name: 'Room',
            component: () => import('@/components/room/Room.vue'),
            meta: {
                requiresAuth: true,
                transitionName: 'router-anim',
                enterActive: 'animated fadeIn'
            }
        },
        {
            path: '*',
            component: () => import('@/components/error/NotFound.vue')
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    await checkUserData(next);
    if (to.meta.requiresAuth) {
        if (localStorage.getItem('authToken') === null) {
            localStorage.clear();
            next({
                name: 'Login',
                params: { message: 'You are unauthorized, Please login to access' }
            });
        } else {
            next();
        }
    } else if (!_.isEmpty(to.meta) && !to.meta.requiresAuth) {
        if (localStorage.getItem('authToken')) {
            next({
                name: 'UserProfile',
                params: { handle: store.getters.getUserData.handle }
            });
        } else {
            next();
        }
    } else {
        next();
    }
    next();
});

export default router;
