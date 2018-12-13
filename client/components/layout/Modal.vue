<template>
    <transition name="fade">
        <div v-show="visible" class="modal">
            <transition name="slideDown">
                <div v-show="visible" class="modal__content">
                    <div class="modal__header">
                        <slot name="header">
                            <h4>Default Header</h4>
                        </slot>
                    </div>
                    <div class="modal__body">
                        <slot name="body">
                            <h4>Default Body Content</h4>
                        </slot>
                    </div>
                    <div class="modal__footer">
                        <slot name="footer">
                            <a @click="close" class="btn btn--modal" slot="footer">Close</a>
                        </slot>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Modal',
    props: ['name'],
    data: function() {
        return {
            visible: false
        };
    },
    computed: {
        modalData() {
            return this.$data;
        }
    },
    methods: {
        close() {
            this.visible = false;
        },
        open() {
            this.visible = true;
        },
        setData(key, value) {
            this.$data[key] = value;
        }
    },
    mounted() {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/modal.scss';
</style>
