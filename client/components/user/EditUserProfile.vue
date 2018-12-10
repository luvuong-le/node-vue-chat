<template>
    <div class="page profile">
        <div class="section profile__content">
            <div class="section__heading mt-10">
                <span class="section__title">Update Account</span>
            </div>
            <div class="section__content">
                <form @submit.prevent="handleSubmit" class="form">
                    <div class="profile__item">
                        <ion-icon name="contact" class="icon icon-lg"></ion-icon>
                    </div>
                    <div class="form__input-group">
                        <ion-icon name="pricetags" class="form__icon"></ion-icon>
                        <input
                            type="text"
                            name="username"
                            class="form__control"
                            placeholder="Enter New Username"
                            v-model.trim="username"
                        >
                        <label for="username" class="form__label">Username</label>
                    </div>
                    <div class="form__input-group">
                        <ion-icon name="person" class="form__icon"></ion-icon>
                        <input
                            type="email"
                            name="email"
                            class="form__control"
                            placeholder="Enter New Email"
                            v-model.trim="email"
                        >
                        <label for="email" class="form__label">Email</label>
                    </div>
                    <div class="form__input-group">
                        <ion-icon name="map" class="form__icon"></ion-icon>
                        <input
                            type="location"
                            name="location"
                            class="form__control"
                            placeholder="Enter New Location"
                            v-model.trim="location"
                        >
                        <label for="location" class="form__label">Location</label>
                    </div>
                    <Error :errors="errors"/>
                    <a @click="handleBackBtn" class="btn btn--info">Back</a>
                    <button type="submit" class="btn btn--clear btn--danger">Update Account</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import slugify from 'slugify';
import Error from '../error/Error.vue';

export default {
    name: 'EditUserProfile',
    components: {
        Error
    },
    data: function() {
        return {
            user: {},
            email:
                this.$store.getters.getUserData.email ||
                JSON.parse(localStorage.getItem('user')).email,
            username:
                this.$store.getters.getUserData.username ||
                JSON.parse(localStorage.getItem('user')).username,
            location:
                this.$store.getters.getUserData.location ||
                JSON.parse(localStorage.getItem('user')).location,
            errors: []
        };
    },
    computed: {
        ...mapGetters(['getUserData', 'isAuthorized'])
    },
    methods: {
        ...mapActions(['saveUserData']),

        handleBackBtn() {
            this.$router.go(-1);
        },

        handleSubmit() {
            const updatedUserDetails = {
                handle: slugify(this.username.toLowerCase()),
                email: this.email,
                username: this.username,
                location: this.location
            };

            if (localStorage.getItem('session_id')) {
                axios
                    .put(`/api/user/current`, updatedUserDetails)
                    .then(res => {
                        this.$store.dispatch('saveUserData', res.data.user);
                        this.user = res.data.user;
                        localStorage.setItem('user', JSON.stringify(res.data.user));
                        this.$router.replace({
                            name: 'UserProfile',
                            params: { handle: updatedUserDetails.handle }
                        });
                    })
                    .catch(err => err);
            }
        }
    },
    created() {
        this.user = this.$store.getters.getUserData;
    },
    mounted() {}
};
</script>


<style lang="scss">
@import '@/assets/scss/views/profile.scss';
</style>
