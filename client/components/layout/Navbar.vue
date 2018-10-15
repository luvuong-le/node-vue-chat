<template>
  <header>
    <nav class="nav">
      <div class="navbar__brand">
          <ion-icon name="rocket" class="navbar__icon navbar__icon--logo"></ion-icon>
          <router-link to="/" class="navbar__textbrand">Astro Chat</router-link>
      </div>
      <span @click="navToggleState = !navToggleState"  class="navbar__toggle">
        <ion-icon name="menu" class="navbar__icon navbar__toggle--icon"></ion-icon>
      </span>
      <ul class="navbar__nav">
        <li v-show="!isAuthorized" class="nav__item">
          <router-link to="/" class="nav__link">Home</router-link>
        </li>
        <li v-show="!isAuthorized" class="nav__item">
          <router-link to="#" class="nav__link">About</router-link>
        </li>
        <li v-show="!isAuthorized" class="nav__item">
          <router-link to="#" class="nav__link">Support</router-link>
        </li>
      </ul>
      <ul class="navbar__nav navbar__nav--right">
        <li v-show="!isAuthorized" class="nav__item">
          <router-link to="https://github.com/luvuong-le" class="nav__link">
            <ion-icon name="logo-github" class="navbar__icon"></ion-icon>
          </router-link>
        </li>
        <li v-show="!isAuthorized" class="nav__item">
          <router-link to="/login" class="nav__link nav__link--rounded">Login</router-link>
        </li>
        <li v-show="!isAuthorized" class="nav__item">
          <router-link to="/register" class="nav__link nav__link--rounded">Sign Up</router-link>
        </li>
        <li v-show="isAuthorized" class="nav__item">
          <router-link :to="{name: 'UserProfile', params: { username: this.getUserData.username}}" class="nav__link nav__link--rounded">Profile</router-link>
        </li>
        <li v-show="isAuthorized" class="nav__item">
          <button @click.prevent="logout" class="nav__link nav__link--btn nav__link--rounded">Logout</button>
        </li>
      </ul>
    </nav>  
    <nav class="snav" v-bind:class = "{'snav--shown': navToggleState}">
      <Particle name="particlejs-nav" />
      <ul class="snav__nav">
        <li v-show="!isAuthorized" @click="this.closeSideNav" class="snav__item">
          <router-link to="/" class="nav__link">Home</router-link>
        </li>
        <li v-show="!isAuthorized" @click="this.closeSideNav" class="snav__item">
          <router-link to="#" class="nav__link">About</router-link>
        </li>
        <li v-show="!isAuthorized" @click="this.closeSideNav" class="snav__item">
          <router-link to="#" class="nav__link">Support</router-link>
        </li>
        <li v-show="!isAuthorized" @click="this.closeSideNav" class="snav__item">
          <router-link to="/login" class="nav__link nav__link--rounded">Login</router-link>
        </li>
        <li v-show="!isAuthorized" @click="this.closeSideNav" class="snav__item">
          <router-link to="/register" class="nav__link nav__link--rounded">Sign Up</router-link>
        </li>
        <li v-show="!isAuthorized" class="snav__item">
          <router-link to="https://github.com/luvuong-le" class="nav__link">
            <ion-icon name="logo-github" class="navbar__icon"></ion-icon>
          </router-link>
        </li>
        <li v-show="isAuthorized" @click="this.closeSideNav"  class="nav__item">
          <router-link :to="{name: 'UserProfile', params: { username: this.getUserData.username }}" class="nav__link nav__link--rounded">Profile</router-link>
        </li>
        <li v-show="isAuthorized" @click="this.closeSideNav" class="nav__item">
          <button @click.prevent="logout" class="nav__link nav__link--btn nav__link--rounded">Logout</button>
        </li>
      </ul>
    </nav> 
  </header>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
import Particle from '@/components/layout/Particle.vue';

export default {
	name: 'Navbar',
	components: {
		Particle: Particle,
	},
	data: function() {
		return {
			navToggleState: false,
		};
	},
	computed: {
		...mapGetters(['getUserData', 'isAuthorized']),
	},
	methods: {
		...mapActions(['toggleAuthState']),
		closeSideNav() {
			this.navToggleState = false;
		},
		logout() {
			if (localStorage.getItem('authToken')) {
				localStorage.removeItem('authToken');
				localStorage.removeItem('session_id');
				this.$store.dispatch('toggleAuthState', false);
				this.$router.push({ name: 'Login' });
			}
		},
	},
	mounted() {
		if (localStorage.getItem('authToken')) {
			this.$store.dispatch('toggleAuthState', true);
		}
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/navbar.scss';
</style>
