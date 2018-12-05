<template>
  <transition name="fade">
    <div v-show="visible" class="modal">
      <transition name="slideDown">
        <div v-show="visible" class="modal__content">
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

/** Fade Animation */
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.fade-leave,
.fade-enter-to {
    opacity: 1;
}

/** Slide In Animation */
.slideDown-enter,
.slideDown-leave-to {
    opacity: 0;
    transform: translateY(-50px);
}

.slideDown-leave,
.slideDown-enter-to {
    opacity: 1;
    transform: translateY(0px);
}
</style>
