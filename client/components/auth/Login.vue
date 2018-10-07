<template>
  <div class="page login">
    <section class="section section__landing">
      <div class="section__heading">
        <span class="section__title">Sign In</span>
      </div>
      <div class="section__content">
        <p class="section__lead">Welcome Back!</p>

        <form class="form">
            <span class="form__lead">
              <ion-icon name="rocket" class="icon"></ion-icon> We are excited to see you again!
            </span><br>
            <div class="form__input-group">
                <ion-icon name="person" class="form__icon"></ion-icon>
                <input type="email" name="email" class="form__control" placeholder="Enter Email" required>
                <label for="email" class="form__label">Email</label>
            </div>
            <div class="form__input-group">
                <ion-icon name="lock" class="form__icon"></ion-icon>
                <input type="password" name="password" class="form__control" placeholder="Enter Password" required>
                <label for="password" class="form__label">Password</label>
            </div>
            <div class="form__info-group">
              <span>Don't have an account?</span>
              <router-link to="/register" class="form__link btn btn--rounded">Register</router-link>
            </div>
            <button type="submit" class="form__submit">Login</button>
        </form>
      </div>
    </section>
    <section class="section__footer">
      <h1>Copyright &copy; 2018 Lu-Vuong Le</h1>
    </section>
  </div>
</template>

<script>
export default {
	name: 'Login',
	mounted() {
		console.log('Mounted');
	},
};
</script>


<style lang="scss">
@import '@/assets/scss/components/form.scss';
</style>
