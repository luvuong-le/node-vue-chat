<template>
    <div class="page login">
        <section class="section section__landing">
            <div class="section__heading">
                <span class="section__title">Register Here</span>
            </div>
            <div class="section__content">
                <p class="section__lead">We hope you will enjoy our application!</p>
                <div class="social">
                    <OAuth
                        provider="facebook"
                        icon="logo-facebook"
                        classes="social__item--facebook"
                    />
                    <OAuth provider="google" icon="logo-googleplus" classes="social__item--google"/>
                </div>
                <form @submit.prevent="handleSubmit" class="form">
                    <span class="form__lead">
                        <ion-icon name="person-add" class="icon"></ion-icon>We always welcome new astros!
                    </span>
                    <br>
                    <div class="form__input-group">
                        <ion-icon name="pricetags" class="form__icon"></ion-icon>
                        <input
                            type="text"
                            name="username"
                            class="form__control"
                            placeholder="Enter Username"
                            required
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
                            placeholder="Enter Email"
                            required
                            v-model.trim="email"
                        >
                        <label for="email" class="form__label">Email</label>
                    </div>
                    <div class="form__input-group">
                        <ion-icon name="lock" class="form__icon"></ion-icon>
                        <input
                            type="password"
                            name="password"
                            class="form__control"
                            placeholder="Enter Password"
                            pattern=".{5,15}"
                            title="Password must be between 5 and 15 characters"
                            required
                            v-model.trim="password"
                        >
                        <label for="password" class="form__label">Password</label>
                    </div>
                    <div class="form__info-group">
                        <span>Already have an account?</span>
                        <router-link to="/login" class="form__link btn btn--rounded">Login</router-link>
                    </div>
                    <Error :errors="errors"/>
                    <button type="submit" class="form__submit">Register</button>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import slugify from 'slugify';
import Error from '../error/Error.vue';
import OAuth from '../social/OAuth.vue';
import setAuthToken from '../../utils/authToken';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Register',
    components: {
        Error,
        OAuth
    },
    data: function() {
        return {
            username: '',
            email: '',
            password: '',
            errors: []
        };
    },
    computed: {
        ...mapGetters(['getSocket'])
    },
    methods: {
        ...mapActions(['saveUserData', 'toggleAuthState']),
        handleSubmit() {
            this.errors = [];

            if (this.username && this.email && this.password) {
                axios
                    .post('/api/auth/register', {
                        handle: slugify(this.username.toLowerCase()),
                        username: this.username,
                        email: this.email,
                        password: this.password
                    })
                    .then(res => {
                        if (res.data.errors) {
                            for (const error of res.data.errors) {
                                const [key] = Object.keys(error);
                                const [value] = Object.values(error);
                                this.errors.push({
                                    key,
                                    value
                                });
                            }
                        } else {
                            localStorage.setItem('authToken', res.data.token);
                            this.$store.dispatch('toggleAuthState', true);
                            this.$store.dispatch('saveUserData', true);

                            setAuthToken(res.data.token);

                            this.$router.push({
                                name: 'UserProfile',
                                params: { handle: res.data.user.handle }
                            });
                        }
                    });
            }

            setTimeout(() => {
                this.errors = [];
            }, 1500);
        }
    },
    mounted() {}
};
</script>


<style lang="scss">
@import '@/assets/scss/components/form.scss';
</style>
