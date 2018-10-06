<template>
  <div id="app">
    <Navbar v-if="['Home', 'Login', 'Register'].includes($route.name)" />
		<Particle />
		<transition name="router-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
			<router-view/>
		</transition>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue';
import Particle from '@/components/layout/Particle.vue';

export default {
	name: 'App',
	components: {
		Navbar: Navbar,
		Particle: Particle,
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/base/base.scss';
</style>
