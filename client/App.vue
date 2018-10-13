<template>
  <div id="app">
    <Navbar v-if="['UserProfile', 'Home', 'Login', 'Register'].includes($route.name)" />
		<Particle name="particle-js"/>
		<transition name="router-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
			<router-view/>
		</transition>
		<Footer v-if="['Home', 'Login', 'Register'].includes($route.name)" />
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue';
import Footer from '@/components/layout/Footer.vue';
import Particle from '@/components/layout/Particle.vue';

export default {
	name: 'App',
	components: {
		Navbar,
		Particle,
		Footer,
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/base/base.scss';
</style>
