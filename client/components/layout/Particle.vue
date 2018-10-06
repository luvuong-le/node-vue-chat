<template>
    <div id="particles-js" class="particle"></div>
</template>


<script>
import 'particles.js';
import particleConfig from '@/assets/config/particlesjs-config.json';

export default {
	name: 'Particle',
	methods: {
		initParticleJS() {
			particlesJS('particles-js', particleConfig);
		},
	},
	mounted() {
		this.initParticleJS();
	},
};
</script>
