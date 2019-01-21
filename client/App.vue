<template>
    <div id="app" class="app">
        <Navbar/>
        <Particle name="particle-js"/>
        <transition
            :name="transitionName"
            :enter-active-class="enterActive"
            :leave-active-class="leaveActive"
            mode="out-in"
        >
            <router-view/>
        </transition>
        <Footer v-if="['Home', 'Login', 'Register', 'About'].includes($route.name)"/>
    </div>
</template>

<script>
import _ from 'lodash';

import Navbar from '@/components/layout/Navbar.vue';
import Footer from '@/components/layout/Footer.vue';
import Particle from '@/components/layout/Particle.vue';

const DEFAULT_TRANSITION = 'fade';
const DEFAULT_ENTER_ACTIVE_CLASS = 'animated fadeIn';
const DEFAULT_LEAVE_ACTIVE_CLASS = 'animated fadeOut';

export default {
    name: 'App',
    components: {
        Navbar: Navbar,
        Particle,
        Footer
    },
    data: function() {
        return {
            transitionName: DEFAULT_TRANSITION,
            leaveActive: DEFAULT_LEAVE_ACTIVE_CLASS,
            enterActive: DEFAULT_ENTER_ACTIVE_CLASS
        };
    },
    methods: {
        resetTransition() {
            this.transitionName = DEFAULT_TRANSITION;
            this.enterActive = DEFAULT_ENTER_ACTIVE_CLASS;
            this.leaveActive = DEFAULT_LEAVE_ACTIVE_CLASS;
        }
    },
    created() {
        this.$router.beforeEach((to, from, next) => {
            if (!_.isEmpty(to.meta)) {
                if (to.meta.transitionName) {
                    this.transitionName = to.meta.transitionName;
                }

                if (to.meta.enterActive) {
                    this.enterActive = to.meta.enterActive;
                }

                if (to.meta.leaveActive) {
                    this.leaveActive = to.meta.leaveActive;
                }
            }

            if (!to.meta.requiresAuth) {
                this.resetTransition();
            }
            next();
        });
    }
};
</script>

<style lang="scss">
@import '@/assets/scss/base/base.scss';
</style>
