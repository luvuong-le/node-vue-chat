<template>
  <div class="page login">
    <section class="section section__landing">
      <div class="section__heading">
        <span class="section__title">Register Here</span>
      </div>
      <div class="section__content">
        <p class="section__lead">We hope you will enjoy our application!</p>

        <form class="form">
            <span class="form__lead">
                <ion-icon name="person-add" class="icon"></ion-icon> We always welcome new astros!
            </span><br>
            <div class="form__input-group">
                <ion-icon name="pricetags" class="form__icon"></ion-icon>
                <input type="text" name="username" class="form__control" placeholder="Enter Username" required>
                <label for="username" class="form__label">Username</label>
            </div>
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
              <span>Already have an account?</span>
              <router-link to="/register" class="form__link btn btn--rounded">Login</router-link>
            </div>
            <button type="submit" class="form__submit">Register</button>
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
	name: 'Register',
};
</script>


<style lang="scss">
@import '@/assets/scss/components/form.scss';
</style>
