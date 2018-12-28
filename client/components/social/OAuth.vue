<template>
    <button class="social__btn btn btn--clear p-0" @click="startAuth" :disabled="disabled">
        <div class="social__item" v-bind:class="this.classes">
            <ion-icon :name="icon" class="icon"></ion-icon>
            Connect With {{ provider }}
        </div>
    </button>
</template>

<script>
import setAuthToken from '../../utils/authToken';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'OAuth',
    props: ['provider', 'icon', 'classes'],
    computed: {
        ...mapGetters(['getSocket'])
    },
    data: function() {
        return {
            popup: null,
            disabled: false
        };
    },
    methods: {
        ...mapActions(['saveUserData', 'toggleAuthState']),
        startAuth(e) {
            if (!this.disabled) {
                e.preventDefault();
                this.popup = this.open();
                this.checkAuth();
                this.disabled = true;
            }
        },
        open() {
            const width = 600,
                height = 600;
            const left = window.innerWidth / 2 - width / 2;
            const top = window.innerHeight / 2 - height / 2;
            const url = `/api/auth/${this.provider}?socketId=${this.getSocket.id}`;

            return window.open(
                url,
                '',
                `toolbar=no, location=no, directories=no, status=no, menubar=no, 
                scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
                height=${height}, top=${top}, left=${left}`
            );
        },
        close() {
            this.popup.close();
        },
        checkAuth() {
            const check = setInterval(() => {
                if (!this.popup || this.popup.closed) {
                    clearInterval(check);
                    this.disabled = false;
                }
            }, 1000);
        }
    },
    created() {
        this.getSocket.on(this.provider, data => {
            data = JSON.parse(data);
            localStorage.setItem('authToken', data.token);

            this.$store.dispatch('toggleAuthState', true);
            this.$store.dispatch('saveUserData', data.user);

            setAuthToken(data.token);

            this.close();
            this.disabled = false;
            this.$router.push({
                name: 'UserProfile',
                params: { handle: data.user.handle }
            });
        });
    },
    beforeDestroy() {
        this.getSocket.removeListener(this.provider);
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/social.scss';
</style>
