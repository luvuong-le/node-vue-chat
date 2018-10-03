<template>
  <header>
    <nav class="nav">
      <a href="/" class="navbar-brand">
        Astro Chat
      </a>
      <ul class="navbar-nav">
        <router-link to="/">Home</router-link>
        <router-link to="#">Login</router-link>
        <router-link to="#">Sign Up</router-link>
      </ul>
    </nav>   
  </header>
</template>


<script>
export default {
	name: 'Navbar',
};
</script>

<style lang="scss" scoped>
  .navbar-brand {
    font-weight: bold
  }

  .navbar-nav {
    flex-grow: 1;
    text-align: right;
  }
</style>
