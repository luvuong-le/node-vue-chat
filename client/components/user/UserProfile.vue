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
                <div class="infobox__container" v-if="user">
                    <span class="lead">Your current profile</span>
                    <div class="infobox__item" v-if="user.social.id === null">
                        <img :src="user.image" alt class="profile__image">
                    </div>
                    <div class="infobox__item" v-else>
                        <img :src="user.social.image" alt class="profile__image">
                    </div>
                    <div class="infobox__item">
                        <span class="infobox__item--left">Display Handle</span>
                        <span class="infobox__item--right">{{ user.handle }}</span>
                    </div>
                    <div class="infobox__item">
                        <span class="infobox__item--left">Email</span>
                        <span
                            class="infobox__item--right"
                            v-if="user.social.email === null"
                        >{{ user.email }}</span>
                        <span class="infobox__item--right" v-else>{{ user.social.email }}</span>
                    </div>
                    <div class="infobox__item">
                        <span class="infobox__item--left">Username</span>
                        <span class="infobox__item--right">{{ user.username }}</span>
                    </div>
                    <div class="infobox__item">
                        <span class="infobox__item--left">Location</span>
                        <span class="infobox__item--right">{{ user.location || 'Unknown' }}</span>
                    </div>
                    <div class="infobox__actions mt-3" v-if="user">
                        <router-link
                            :to="{name: 'EditUserProfile', params: { handle: user.handle }}"
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
            user: null
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
@import '@/assets/scss/components/infobox.scss';
</style>
