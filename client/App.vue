<template>
  <div id="app">
    <Navbar v-if="['Home', 'Login'].includes($route.name)" />
	<transition name="router-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
		<router-view/>
	</transition>
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
	background: #18191c;
	font-family: 'Work Sans', sans-serif;
}

header {
	background: #18191c;
	padding: 1rem;
	border-bottom: 1px solid #fff;
	width: 100%;
}

img {
	width: 100%;
}

nav a {
	text-decoration: none;
	color: #fff;
	margin: 0 0.5rem;
}

li .nav__link.router-link-exact-active {
	font-weight: bold;
	color: #fff;
	opacity: 1;
}

.btn {
	text-decoration: none;
	color: #fff;
	text-align: center;
	font-size: 0.9em;
	margin: 0 1em;
	padding: 12px 50px;
	display: inline-block;
	cursor: pointer;
	transition: transform 1s ease;
	animation: hover 1s linear infinite;

	&--white {
		color: #000;
		background: #fff;
		border-radius: 5px;
	}

	&--blue {
		color: #fff;
		background: #3c9adf;
		border-radius: 5px;
		animation-delay: 0.8s;
	}
}

@keyframes hover {
	0% {
		transform: translateY(0);
	}
	20% {
		transform: translateY(5px);
	}
	40% {
		transform: translateY(10px);
	}
	60% {
		transform: translateY(15px);
	}
	80% {
		transform: translateY(10px);
	}
	100% {
		transform: translateY(0px);
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes zoomIn {
	0% {
		opacity: 0;
		transform: translate(-20px, 20px);
	}
	50% {
		opacity: 0.5;
		transform: translate(-10px, 10px);
	}
	100% {
		opacity: 1;
		transform: translate(0) rotate(45deg);
	}
}

.mt-3 {
	margin-top: 30px;
}

.page {
	height: 100%;
	background: transparent;
	color: #fff;
	background: url(./assets/BackgroundPath.svg) no-repeat;
	background-size: 100%;
	background-position: bottom center;
}

.section {
	height: 100vh;
	width: 100%;
	position: relative;
	padding: 1rem;
}
</style>
