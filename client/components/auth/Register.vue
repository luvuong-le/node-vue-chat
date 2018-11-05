<template>
  <div class="page login">
    <section class="section section__landing">
      <div class="section__heading">
        <span class="section__title">Register Here</span>
      </div>
      <div class="section__content">
        <p class="section__lead">We hope you will enjoy our application!</p>

        <form @submit.prevent="handleSubmit" class="form">
            <span class="form__lead">
                <ion-icon name="person-add" class="icon"></ion-icon> We always welcome new astros!
            </span><br>
            <div class="form__input-group">
                <ion-icon name="pricetags" class="form__icon"></ion-icon>
                <input type="text" name="username" class="form__control" placeholder="Enter Username" required v-model.trim='username'>
                <label for="username" class="form__label">Username</label>
            </div>
            <div class="form__input-group">
                <ion-icon name="person" class="form__icon"></ion-icon>
                <input type="email" name="email" class="form__control" placeholder="Enter Email" required v-model.trim="email">
                <label for="email" class="form__label">Email</label>
            </div>
            <div class="form__input-group">
                <ion-icon name="lock" class="form__icon"></ion-icon>
                <input type="password" name="password" class="form__control" placeholder="Enter Password" pattern=".{5,15}" title="Password must be between 5 and 15 characters" required v-model.trim="password">
                <label for="password" class="form__label">Password</label>
            </div>
            <div class="form__info-group">
              <span>Already have an account?</span>
              <router-link to="/login" class="form__link btn btn--rounded">Login</router-link>
            </div>
            <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
						  <div v-show="errors.length !== 0" class="form__error">
								<transition-group name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
									<span v-for="(error, index) in errors" v-bind:key='index'>{{ error }}</span>
								</transition-group>
            	</div>
						</transition>
            <button type="submit" class="form__submit">Register</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'Register',
	data: function() {
		return {
			username: '',
			email: '',
			password: '',
			errors: [],
		};
	},
	methods: {
		handleSubmit() {
			this.errors = [];

			if (this.username && this.email && this.password) {
				axios
					.post('http://localhost:5000/api/auth/register', {
						username: this.username,
						email: this.email,
						password: this.password,
					})
					.then(res => {
						if (res.data.errors) {
							for (const error of res.data.errors) {
								const [param] = Object.keys(error);
								const [value] = Object.values(error);
								this.errors.push(value);
							}
						} else {
							localStorage.setItem('authToken', res.data.token);
							localStorage.setItem('session_id', res.data.user.session_id);
							const { password, ...userData } = res.data.user;
							localStorage.setItem('user', JSON.stringify(userData));
							this.$router.push({ name: 'UserProfile', params: { username: res.data.user.username } });
						}
					});
			}

			setTimeout(() => {
				this.errors = [];
			}, 1500);
		},
	},
};
</script>


<style lang="scss">
@import '@/assets/scss/components/form.scss';
</style>
