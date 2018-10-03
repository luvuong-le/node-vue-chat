<template>
  <div class="page home">
    <h1 class="page__title">Chat with people</h1>
  </div>
</template>

<script>
// @ is an alias to /client

export default {
	name: 'home',
	components: {},
};
</script>

<style scoped lang="scss">
.page {
  height: 100%;
	background: #fff;
  padding: 1rem;

  &__title {
    text-align: center;
    font-weight: normal;
    font-size: 1.8rem;
  }
}
</style>

