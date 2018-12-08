<template>
    <div class="page profile">
        <div class="section profile__content">
            <div class="section__heading mt-6 mb-3">
                <span class="section__title">Dashboard</span>
            </div>
            <div class="section__content">
                <router-link
                    :to="{name: 'RoomList'}"
                    class="btn btn--info mt-3 center"
                >Start Chatting!</router-link>
                <div class="profile__container">
                    <span class="lead">Your current profile</span>
                    <div class="profile__item">
                        <ion-icon name="contact" class="icon icon-lg"></ion-icon>
                    </div>
                    <div class="profile__item">
                        <span class="profile__item--left">Email</span>
                        <span class="profile__item--right">{{ user.email }}</span>
                    </div>
                    <div class="profile__item">
                        <span class="profile__item--left">Username</span>
                        <span class="profile__item--right">{{ user.username }}</span>
                    </div>
                    <div class="profile__item">
                        <span class="profile__item--left">Location</span>
                        <span class="profile__item--right">{{ user.location || 'Unknown' }}</span>
                    </div>
                    <div class="profile__actions mt-3">
                        <router-link
                            :to="{name: 'EditUserProfile', params: { username: user.username}}"
                            class="btn btn--info"
                        >Edit Profile</router-link>
                        <router-link to="/register" class="btn btn--danger">Delete Account</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'UserProfile',
    data: function() {
        return {
            user: {}
        };
    },
    computed: {
        ...mapGetters(['getUserData', 'isAuthorized'])
    },
    methods: {
        ...mapActions(['saveUserData', 'toggleAuthState'])
    },
    created() {
        if (localStorage.getItem('authToken')) {
            axios
                .get(`/api/user/current`)
                .then(res => {
                    this.$store.dispatch('saveUserData', res.data);
                    this.$store.dispatch('toggleAuthState', true);
                    localStorage.setItem('user', JSON.stringify(res.data));
                    this.user = res.data;
                })
                .catch(err => err);
        }
    },
    mounted() {}
};
</script>


<style lang="scss">
@import '@/assets/scss/views/profile.scss';
</style>
