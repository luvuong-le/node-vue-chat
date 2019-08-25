<template>
    <div class="page home">
        <section class="section section__landing">
            <div class="section__heading">
                <span class="section__title"></span>
            </div>
            <div class="section__content">
                <p
                    class="section__lead"
                >Realtime chat application created using Vue JS, Socket IO and Node JS. Create A Room, Join a Room, Chat with people from all over! Connect with new friends and have fun!</p>
                <router-link to="/" class="btn btn--anim btn--white">Learn More</router-link>
                <router-link to="/register" class="btn btn--anim btn--info">Register Now</router-link>
                <div class="section__graphic">
                    <img src="@/assets/img/undraw_group_chat_v059.svg" alt />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
// @ is an alias to /client
import Typed from 'typed.js';

export default {
    name: 'Home',
    props: [],
    components: {},
    mounted() {
        let options = {
            strings: [
                'Experience Realtime Chatting',
                'Connect with new faces',
                'Chat with Friends'
            ],
            typeSpeed: 100,
            loop: true
        };

        new Typed('.section__title', options);
    }
};
</script>
