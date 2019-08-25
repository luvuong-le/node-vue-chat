<template>
    <div class="page login">
        <section class="section section__landing">
            <div class="section__heading">
                <span class="section__title">Sign In</span>
            </div>
            <div class="section__content">
                <Error :errorMessage="errorMessage" />
                <p class="section__lead">Welcome Back!</p>
                <div class="social">
                    <OAuth
                        provider="facebook"
                        icon="logo-facebook"
                        classes="social__item--facebook"
                    />
                    <OAuth provider="google" icon="logo-googleplus" classes="social__item--google" />
                </div>
                <form @submit.prevent="handleSubmit" class="form">
                    <span class="form__lead">
                        <ion-icon name="rocket" class="icon"></ion-icon>We are excited to see you again!
                    </span>
                    <br />
                    <div class="form__input-group">
                        <ion-icon name="person" class="form__icon"></ion-icon>
                        <input
                            type="email"
                            name="email"
                            class="form__control"
                            placeholder="Enter Email"
                            required
                            v-model.trim="email"
                        />
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
                        />
                        <label for="password" class="form__label">Password</label>
                    </div>
                    <div class="form__info-group">
                        <span>Don't have an account?</span>
                        <router-link to="/register" class="form__link btn btn--rounded">Register</router-link>
                    </div>
                    <Error :errors="errors" />
                    <button type="submit" class="form__submit">Login</button>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import Error from '../error/Error.vue';
import OAuth from '../social/OAuth.vue';
import { mapActions } from 'vuex';
import setAuthToken from '../../utils/authToken';

export default {
    name: 'Login',
    props: ['message'],
    components: {
        Error,
        OAuth
    },
    data: function() {
        return {
            email: '',
            password: '',
            errorMessage: this.message,
            errors: []
        };
    },
    methods: {
        ...mapActions(['saveUserData', 'toggleAuthState']),

        handleSubmit() {
            this.errors = [];
            if (this.email && this.password) {
                axios
                    .post('/api/auth/login', {
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
                            this.$store.dispatch('saveUserData', res.data.user);

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
    mounted() {
        if (this.errorMessage) {
            setTimeout(() => {
                this.errorMessage = '';
            }, 1500);
        }
    }
};
</script>


<style lang="scss">
@import '@/assets/scss/components/form.scss';
</style>
