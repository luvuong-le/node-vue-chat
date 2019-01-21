<template>
    <header>
        <nav class="nav">
            <div class="navbar__brand">
                <ion-icon name="rocket" class="navbar__icon navbar__icon--logo"></ion-icon>
                <router-link to="/" class="navbar__textbrand">Astro Chat</router-link>
            </div>
            <span class="navbar__toggle">
                <ion-icon
                    name="menu"
                    @click="navToggleState = !navToggleState"
                    class="navbar__icon navbar__toggle--icon"
                ></ion-icon>
            </span>
            <ul class="navbar__nav" v-if="!isAuthorized">
                <li class="nav__item">
                    <router-link to="/" class="nav__link">Home</router-link>
                </li>
                <li class="nav__item">
                    <router-link to="/about" class="nav__link">About</router-link>
                </li>
            </ul>
            <ul class="navbar__nav navbar__nav--right" v-if="!isAuthorized">
                <li class="nav__item">
                    <a
                        href="https://github.com/luvuong-le/astro-chat"
                        target="_blank"
                        class="nav__link"
                    >
                        <ion-icon name="logo-github" class="navbar__icon"></ion-icon>
                    </a>
                </li>
                <li class="nav__item">
                    <router-link to="/login" class="nav__link nav__link--rounded">Login</router-link>
                </li>
                <li class="nav__item">
                    <router-link to="/register" class="nav__link nav__link--rounded">Sign Up</router-link>
                </li>
            </ul>
            <SignedInLinks :logout="logout" :user="user" v-if="isAuthorized"/>
        </nav>
        <nav class="snav" v-bind:class="{'snav--shown': navToggleState}">
            <Particle name="particlejs-nav"/>
            <ul class="snav__nav" v-if="!isAuthorized">
                <li @click="this.closeSideNav" class="snav__item">
                    <router-link to="/" class="nav__link">Home</router-link>
                </li>
                <li @click="this.closeSideNav" class="snav__item">
                    <router-link to="/about" class="nav__link">About</router-link>
                </li>
                <li @click="this.closeSideNav" class="snav__item">
                    <router-link to="/login" class="nav__link nav__link--rounded">Login</router-link>
                </li>
                <li @click="this.closeSideNav" class="snav__item">
                    <router-link to="/register" class="nav__link nav__link--rounded">Register</router-link>
                </li>
                <li class="snav__item">
                    <a
                        href="https://github.com/luvuong-le/astro-chat"
                        target="_blank"
                        class="nav__link"
                    >
                        <ion-icon name="logo-github" class="navbar__icon"></ion-icon>
                    </a>
                </li>
            </ul>

            <ul class="snav__nav" v-if="isAuthorized">
                <li @click="this.closeSideNav" class="snav__item">
                    <router-link
                        v-if="Object.keys(user).length > 0"
                        :to="{name: 'UserProfile', params: { handle: user.handle}}"
                        class="nav__link nav__link--rounded"
                    >{{ user.handle }}</router-link>
                </li>
                <li @click="this.closeSideNav" class="snav__item">
                    <button
                        @click.prevent="logout"
                        class="nav__link nav__link--btn nav__link--rounded"
                    >Logout</button>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Particle from '@/components/layout/Particle.vue';
import SignedInLinks from '@/components/layout/SignedInLinks.vue';

export default {
    name: 'Navbar',
    components: {
        Particle: Particle,
        SignedInLinks
    },
    data: function() {
        return {
            navToggleState: false
        };
    },
    computed: {
        ...mapGetters(['getUserData', 'isAuthorized']),
        user() {
            return this.getUserData;
        }
    },
    methods: {
        ...mapActions(['toggleAuthState']),
        closeSideNav() {
            this.navToggleState = false;
        },
        logout() {
            if (localStorage.getItem('authToken')) {
                localStorage.clear();
                this.$store.dispatch('toggleAuthState', false);
                this.$router.push({ name: 'Login' });
            }
        }
    },
    created() {
        if (localStorage.getItem('authToken')) {
            this.$store.dispatch('toggleAuthState', true);
        } else {
            localStorage.clear();
            this.$store.dispatch('toggleAuthState', false);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/navbar.scss';
</style>
