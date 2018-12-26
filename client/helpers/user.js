import store from '../store';
import _ from 'lodash';
import axios from 'axios';

export const checkUserData = async next => {
    if (localStorage.getItem('authToken')) {
        if (_.isEmpty(store.getters.getUserData)) {
            const res = await axios.get('/api/user/current');

            if (res.data) {
                await store.dispatch('saveUserData', res.data);
                await store.dispatch('toggleAuthState', true);

                next();
            }
        } else {
            next();
        }
    } else {
        next();
    }
};
