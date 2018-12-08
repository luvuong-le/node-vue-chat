<template>
    <div class="page room">
        <section class="section p-0">
            <div class="section__content u-max-height">
                <div class="chat">
                    <div class="chat__c-userlist">
                        <Sidebar name="userlist">
                            <div slot="header">
                                <span class="section__title">Online Users</span>
                            </div>
                            <div slot="body">
                                <ul class="chat__userlist" v-if="this.getCurrentRoom">
                                    <li
                                        class="chat__user"
                                        v-for="(user, i) in this.getCurrentRoom.users"
                                        :key="i"
                                    >
                                        <div class="chat__user-item">
                                            <img
                                                src="https://img.icons8.com/color/48/000000/user.png"
                                                class="chat__user-avatar"
                                                alt
                                            >
                                            <div class="chat__user-details">
                                                <span>{{ user.username }}</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="chat__user-item">
                                            <img
                                                src="https://img.icons8.com/color/48/000000/user.png"
                                                class="chat__user-avatar"
                                                alt
                                            >
                                            <div class="chat__user-details">
                                                <span>Test User 4</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div slot="footer">
                                <button
                                    @click="leaveRoom"
                                    class="btn btn--clear btn--danger center"
                                >Leave Room</button>
                            </div>
                        </Sidebar>
                    </div>
                    <div class="chat__content">
                        <div class="chat__header">
                            <span class="section__title"># {{ room_name }}</span>
                            <div class="chat__actions">
                                <ion-icon name="people" class="icon"></ion-icon>
                            </div>
                        </div>
                        <MessageList/>
                        <ChatInput/>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
import axios from 'axios';
import MessageList from '../chat/MessageList.vue';
import ChatInput from '../chat/ChatInput.vue';
import Sidebar from '../layout/Sidebar.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Room',
    components: {
        MessageList,
        ChatInput,
        Sidebar
    },
    data: function() {
        return {
            room_name: null,
            users: null,
            messages: null
        };
    },
    computed: {
        ...mapGetters(['getUserData', 'getCurrentRoom', 'getSocket'])
    },
    methods: {
        ...mapActions(['saveCurrentRoom']),
        leaveRoom(e) {
            e.preventDefault();
            axios
                .post('/api/room/remove/users', {
                    room_name: this.getCurrentRoom.name
                })
                .then(() => {
                    this.$router.push({ name: 'RoomList' });
                });
        }
    },
    created() {
        axios
            .get(`/api/room/${this.$route.params.id}`)
            .then(res => {
                this.$store.dispatch('saveCurrentRoom', res.data);
                this.getSocket.emit('userJoined', {
                    room: this.getCurrentRoom,
                    user: this.getUserData,
                    content: `${this.getUserData.username} joined ${this.getCurrentRoom.name}`,
                    admin: true
                });
                this.getSocket.on('receivedMessage', data => {
                    console.log(`${data}`);
                });
            })
            .catch(err => console.log(err));
    },
    mounted() {
        this.room_name = this.getCurrentRoom.name;
    },
    beforeDestroy() {
        this.getSocket.removeListener('userJoined');
    }
};
</script>


<style lang="scss">
@import '@/assets/scss/views/chat.scss';
</style>
