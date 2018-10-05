<template>
  <div class="page home">
    <section class="section section__landing">
      <div class="section__heading">
        <span class="section__title"></span>
      </div>
      <div class="section__content">
        <p class="section__lead">Realtime chat application created using Vue JS, Socket IO and Node JS. Create A Room, Join a Room, Chat with people from all over! Connect with new friends and have fun!</p>
        <a href="/" class="btn btn--white">Learn More</a>
        <a href="/register" class="btn btn--blue">Register Now</a>
        <div class="section__graphic">
          <img src="@/assets/Desk.svg" alt="">
        </div>
      </div>
    </section>
    <section class="section__footer">
      <h3>Copyright &copy; 2018 Lu-Vuong Le</h3>
    </section>
  </div>
</template>

<script>
// @ is an alias to /client
import Typed from 'typed.js';

export default {
	name: 'Home',
	components: {},
	mounted() {
		let options = {
			strings: ['Experience Realtime Chatting', 'Connect with new faces', 'Chat with Friends'],
			typeSpeed: 100,
			loop: true,
		};

		let typed = new Typed('.section__title', options);
	},
};
</script>

<style lang="scss">
.section {
	&__heading {
		font-size: 2.5rem;
		text-align: center;
	}

	&__title {
		font-weight: bold;
		width: auto;
		display: inline-block;
	}

	&__lead {
		text-align: center;
		width: 50%;
		margin: 1em auto 3em auto;
		font-size: 0.9em;
		line-height: 1.5em;
		color: rgba(255, 255, 255, 0.8);
	}

	&:first-child {
		height: calc(100vh - 66px);
	}

	&__landing {
		margin: 4em 0 10em 0;
	}

	&__content {
		text-align: center;
	}

	&__graphic {
		width: 100%;
		margin: 4em 0;

		& > img {
			width: 50%;
		}
	}

	&__footer {
		padding: 2em;
		width: 90%;
		margin: 0 auto;
		background: transparent;
		text-align: center;
		border-top: 1px solid #fff;
	}
}
</style>

