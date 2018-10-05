<template>
  <div class="page login">
    <section class="section section__landing">
      <div class="section__heading">
        <span class="section__title">Sign In</span>
      </div>
      <div class="section__content">
        <p class="section__lead">Welcome Back!</p>

        <form class="form">
            <p class="lead">We are excited to see you again!</p><br>
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
            <p>Don't have an account? Register <router-link to="/register" class="form__link">Here!</router-link></p>
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
export default {};
</script>


<style lang="scss">
.form {
	position: relative;
	width: 480px;
	margin: 0 auto;
	padding: 3em 1em;
	box-shadow: 1px 1px 1px 1px #000;
	transform: translateY(30px);

	&__input-group {
		position: relative;
		width: auto;
	}

	&__label {
		position: absolute;
		top: 50%;
		left: 10px;
		opacity: 0.5;
		font-weight: bold;
		margin: -10px 22px;
		text-transform: uppercase;
		transition: top 0.5s ease, left 0.5s ease, opacity 1s ease;
	}

	&__control {
		position: relative;
		padding: 1em;
		border-radius: 3px;
		border: 1px solid #fff;
		background: transparent;
		margin: 1.5em 0 2.5em 0;
		z-index: 1;
		width: 90%;
		color: #fff;
		font-weight: bold;
		font-family: 'Work Sans', sans-serif;
		outline: none;

		&:focus + label,
		&:focus:valid + label,
		&:valid + label,
		&:focus:invalid + label {
			opacity: 1;
			top: 0;
			left: 0;
		}

		&:invalid + label {
			opacity: 0;
		}

		&:focus:invalid {
			border: 1px solid crimson;
		}

		&:focus:valid {
			border: 1px solid plum;
		}
	}

	&__submit {
		text-decoration: none;
		color: #fff;
		text-align: center;
		margin: 1em 1em 0 1em;
		padding: 12px;
		width: 90%;
		display: inline-block;
		cursor: pointer;
		color: #fff;
		background: #3c9adf;
		border-radius: 3px;
		border: 0;
		font-weight: bold;
		text-transform: uppercase;
		font-size: 1em;
		font-family: 'Work Sans', sans-serif;
	}

	&__link {
		text-decoration: none;
		color: #fff;
		font-weight: bold;
	}

	&__icon {
		position: absolute;
		top: 30px;
		right: 15px;
		font-size: 1.5em;
		margin: 0 0.8em;
		z-index: 2;
	}
}
</style>
