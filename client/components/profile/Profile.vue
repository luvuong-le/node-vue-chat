<template>
    <div class="page profile">
        <div class="section section--mmt">
            <div class="section__heading mt-10">
                <span class="section__title">{{ user.username }}'s</span>
            </div>
            <div class="section__content">
                <div class="profile__container">
                    <span class="lead">{{ user.username }}'s profile</span>
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
                        <a @click="$router.go(-1)" class="btn btn--info">Back</a>
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
                .get(`/api/profile/${this.$route.params.username}`)
                .then(res => (this.user = res.data))
                .catch(err => err);
        }
    },
    mounted() {}
};
</script>


<style lang="scss">
@import '@/assets/scss/views/profile.scss';
</style>
