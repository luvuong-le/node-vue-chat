<template>
  <div class="page login">
    <section class="section section__landing">
      <div class="section__heading">
        <span class="section__title">Sign In</span>
      </div>
      <div class="section__content">
        <p class="section__lead">Welcome Back!</p>

        <form @submit.prevent="handleSubmit" class="form">
            <span class="form__lead">
              <ion-icon name="rocket" class="icon"></ion-icon> We are excited to see you again!
            </span><br>
            <div class="form__input-group">
                <ion-icon name="person" class="form__icon"></ion-icon>
                <input type="email" name="email" class="form__control" placeholder="Enter Email" required v-model.trim="email">
                <label for="email" class="form__label">Email</label>
            </div>
            <div class="form__input-group">
                <ion-icon name="lock" class="form__icon"></ion-icon>
                <input type="password" name="password" class="form__control" placeholder="Enter Password" pattern="/{5,15}/" title="Password must be between 5 and 15 characters" required v-model.trim="password">
                <label for="password" class="form__label">Password</label>
            </div>
            <div class="form__info-group">
              <span>Don't have an account?</span>
              <router-link to="/register" class="form__link btn btn--rounded">Register</router-link>
            </div>
						<transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
						  <div v-show="errors.length !== 0" class="form__error">
								<transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
									<span v-for="(error, index) in errors" v-bind:key='index'>{{ error }}</span>
								</transition>
            	</div>
						</transition>
            <button type="submit" class="form__submit">Login</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'Login',
	data: function() {
		return {
			email: '',
			password: '',
			errors: [],
		};
	},
	methods: {
		handleSubmit(e) {
			this.errors = [];
			if (this.email && this.password) {
				axios
					.post('http://localhost:5000/api/auth/login', { email: this.email, password: this.password })
					.then(res => {
						if (res.data.errors) {
							for (const error of res.data.errors) {
								const [param] = Object.keys(error);
								const [value] = Object.values(error);
								this.errors.push(value);
							}
						} else {
							localStorage.setItem('authToken', res.data.token);
						}
					});
			}

			setTimeout(() => {
				this.errors = [];
			}, 1500);
		},
	},
	mounted() {
		console.log('Mounted');
	},
};
</script>


<style lang="scss">
@import '@/assets/scss/components/form.scss';
</style>
