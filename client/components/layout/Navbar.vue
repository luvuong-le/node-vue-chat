<template>
  <header>
    <nav class="nav">
      <div class="navbar__brand">
          <ion-icon name="rocket" class="navbar__icon navbar__icon--logo"></ion-icon>
          <router-link to="/" class="navbar__textbrand">Astro Chat</router-link>
      </div>
      <ul class="navbar__nav">
        <li class="nav__item">
          <router-link to="/" class="nav__link">Home</router-link>
        </li>
        <li class="nav__item">
          <router-link to="#" class="nav__link">About</router-link>
        </li>
        <li class="nav__item">
          <router-link to="#" class="nav__link">Support</router-link>
        </li>
      </ul>
      <ul class="navbar__nav navbar__nav--right">
        <li class="nav__item">
          <router-link to="https://github.com/luvuong-le" class="nav__link">
            <ion-icon name="logo-github" class="navbar__icon"></ion-icon>
          </router-link>
        </li>
        <li class="nav__item">
          <router-link to="/login" class="nav__link nav__link--rounded">Login</router-link>
        </li>
        <li class="nav__item">
          <router-link to="/register" class="nav__link nav__link--rounded">Sign Up</router-link>
        </li>
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
@import '@/assets/scss/components/navbar.scss';
</style>
