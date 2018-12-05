<template>
  <div class="page room">
    <section class="section">
      <div class="section__heading mt-3">
        <span class="section__title">{{ room_name }}</span>
      </div>
      <div class="section__content"></div>
    </section>
  </div>
</template>


<script>
export default {
    name: 'Room',
    data: function() {
        return {
            room_name: null
        };
    },
    mounted() {
        this.room_name = this.$route.params.roomname;
    }
};
</script>


<style lang="scss">
</style>
