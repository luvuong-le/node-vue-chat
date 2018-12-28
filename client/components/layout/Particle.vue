<template>
    <div v-bind:id="this.name" class="particle"></div>
</template>


<script>
import 'particles.js';
import particleConfig from '@/assets/config/particlesjs-config.json';

export default {
    name: 'Particle',
    props: ['name'],
    data: function() {
        return {
            id: this.name
        };
    },
    methods: {
        initParticleJS() {
            window.particlesJS(this.id, particleConfig);
        }
    },
    mounted() {
        this.initParticleJS();
    }
};
</script>
