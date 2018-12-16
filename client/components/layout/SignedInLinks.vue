<template>
    <ul class="navbar__nav navbar__nav--right">
        <!-- <li class="nav__item">
            <router-link :to="{name: 'RoomList'}" class="nav__link nav__link--rounded">Rooms</router-link>
        </li>-->
        <li class="nav__item">
            <router-link
                :to="{name: 'UserProfile', params: { handle: this.$store.getters.getUserData.handle }}"
                class="nav__link nav__link--rounded"
            >{{ this.$store.getters.getUserData.handle }}</router-link>
        </li>
        <li class="nav__item">
            <button
                @click.prevent="logout"
                class="nav__link nav__link--btn nav__link--rounded"
            >Logout</button>
        </li>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'SignedInLinks',
    props: ['logout'],
    data: function() {
        return {
            username: null
        };
    },
    computed: {
        ...mapGetters(['getUserData', 'isAuthorized'])
    },
    methods: {},
    created() {},
    mounted() {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/navbar.scss';
</style>
