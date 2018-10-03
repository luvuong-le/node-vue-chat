<template>
  <div id="app">
    <Navbar v-if="['home'].includes($route.name)" />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue';

export default {
	name: 'App',
	components: {
		Navbar: Navbar,
	},
};
</script>

<style lang="scss">
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

html,
body {
	height: 100%;
	// background: rgba(60, 154, 223, .5);
	background: #fff;
	font-family: 'Work Sans', sans-serif;
}

header {
	background: #fff;
	padding: 1rem;
	border-bottom: 1.5px solid #3C9ADF;
}

nav {
	display: flex;
}

nav a {
	text-decoration: none;
	color: #3C9ADF;
	margin: 0 .5rem;
}
</style>
