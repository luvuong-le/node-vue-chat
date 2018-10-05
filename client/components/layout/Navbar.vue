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
          <router-link to="#" class="nav__link">
            <ion-icon name="logo-github" class="navbar__icon"></ion-icon>
          </router-link>
        </li>
        <li class="nav__item">
          <router-link to="/login" class="nav__link nav__link--rounded">Login</router-link>
        </li>
        <li class="nav__item">
          <router-link to="#" class="nav__link nav__link--rounded">Sign Up</router-link>
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
.nav {
	display: flex;
	align-items: center;
	width: 85%;
	padding: 0.3em 0;
	margin: 0 auto;

	&__link {
		color: rgba(255, 255, 255, 0.7);
		transition: opacity 0.5s ease;

		&--rounded {
			border-radius: 20px;
			border: 2px solid #fff;
			padding: 5px 17px 7px;

			&:hover {
				opacity: 0.5;
			}
		}
	}

	&__item {
		list-style: none;
		font-size: 0.8em;
		display: flex;
		align-items: center;
	}
}

.navbar {
	&__brand {
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-size: 1.2em;
		display: flex;
		align-items: center;
	}

	&__textbrand {
		font-family: 'Russo One', sans-serif;
		animation: fadeIn 0.5s ease;
	}

	&__icon {
		font-size: 2.5em;
		color: #fff;

		&--logo {
			transform: rotate(45deg);
			font-size: 1.8em;
			color: #fff;
			animation: zoomIn 0.5s linear;
		}
	}

	&__nav {
		display: flex;
		margin: 0 1em;
		align-items: center;

		&--right {
			flex-grow: 1;
			text-align: right;
			justify-content: flex-end;
		}
	}
}
</style>
