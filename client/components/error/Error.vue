<template>
    <transition
        name="fade"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
    >
        <div v-if="this.errors" v-show="this.errors.length !== 0" class="form__error">
            <transition-group
                name="fade"
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
                mode="out-in"
            >
                <span v-for="error in errors" :key="error.key">{{ error.value }}</span>
            </transition-group>
        </div>
        <div v-else v-show="this.errorMessage" class="mb-6 form__error">
            <transition
                name="fade"
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
                mode="out-in"
            >
                <span>{{ this.errorMessage }}</span>
            </transition>
        </div>
    </transition>
</template>


<script>
export default {
    name: 'Error',
    props: ['errors', 'errorMessage']
};
</script>


<style lang="scss" scoped>
</style>
