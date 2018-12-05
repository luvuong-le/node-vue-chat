<template>
  <transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
    <div v-show="visible" class="modal">
      <div class="modal__content">
        <div class="modal__header">
          <slot name="header"></slot>
        </div>
        <div class="modal__body">
          <slot name="body"></slot>
        </div>
        <div class="modal__footer">
          <slot name="footer">
            <a @click="close" class="btn btn--modal" slot="footer">Close</a>
          </slot>
        </div>
      </div>
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
    methods: {
        close() {
            this.visible = false;
        },
        open() {
            this.visible = true;
        }
    },
    mounted() {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/modal.scss';
</style>
