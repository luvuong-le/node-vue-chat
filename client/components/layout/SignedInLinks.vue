<template>
  <ul class="navbar__nav navbar__nav--right">
    <li class="nav__item">
      <router-link :to="{name: 'RoomList'}" class="nav__link nav__link--rounded">Rooms</router-link>
    </li>
    <li class="nav__item">
      <router-link
        :to="{name: 'UserProfile', params: { username: this.$store.getters.getUserData.username }}"
        class="nav__link nav__link--rounded"
      >{{ this.$store.getters.getUserData.username }}</router-link>
    </li>
    <li class="nav__item">
      <button @click.prevent="logout" class="nav__link nav__link--btn nav__link--rounded">Logout</button>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'SignedInLinks',
    data: function() {
        return {
            username: null
        };
    },
    computed: {
        ...mapGetters(['getUserData', 'isAuthorized'])
    },
    created() {
        this.username = this.$store.getters.getUserData.username;
    },
    methods: {
        logout() {
            if (localStorage.getItem('authToken')) {
                localStorage.clear();
                this.$store.dispatch('toggleAuthState', false);
                this.$router.push({ name: 'Login' });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/navbar.scss';
</style>
