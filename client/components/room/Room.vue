<template>
    <div class="page room">
        <section class="section p-0">
            <div class="section__content u-max-height">
                <div class="chat">
                    <div class="chat__c-userlist">
                        <Sidebar name="userlist">
                            <template slot="header">
                                <div>
                                    <ion-icon name="person" class="icon"></ion-icon>
                                </div>
                                <span class="section__title">Online Users</span>
                            </template>
                            <template slot="body">
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
                                </ul>
                            </template>
                            <template slot="footer">
                                <button
                                    @click="leaveRoom"
                                    class="btn btn--clear btn--danger center"
                                >Leave Room</button>
                            </template>
                        </Sidebar>
                    </div>
                    <div class="chat__content">
                        <div class="chat__header" v-if="room">
                            <span class="section__title"># {{ room.name }}</span>
                            <div class="chat__actions">
                                <ion-icon name="analytics" class="icon"></ion-icon>
                                <ion-icon name="people" class="icon"></ion-icon>
                            </div>
                        </div>
                        <MessageList :messages="messages"/>
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
            room: null,
            users: null,
            messages: null
        };
    },
    computed: {
        ...mapGetters(['getUserData', 'getCurrentRoom', 'getSocket'])
    },
    methods: {
        ...mapActions(['saveCurrentRoom']),
        checkUserTabs(room) {
            if (room && room.users.findIndex(user => user._id === this.getUserData._id) === -1) {
                this.$router.push({ name: 'RoomList' });
            }
        },
        leaveRoom(e) {
            if (e) {
                e.preventDefault();
            }

            axios
                .post('/api/room/remove/users', {
                    room_name: this.getCurrentRoom.name
                })
                .then(res => {
                    this.getSocket.emit('exitRoom', {
                        room: res.data,
                        user: this.getUserData,
                        admin: true,
                        content: `${this.getUserData.username} left ${this.getCurrentRoom.name}`
                    });
                    this.$router.push({ name: 'RoomList' });
                });
        }
    },
    created() {
        axios
            .get(`/api/room/${this.$route.params.id}`)
            .then(res => {
                this.room = res.data;
                this.$store.dispatch('saveCurrentRoom', res.data);

                /** Socket IO: User join event, get latest messages from room */
                this.getSocket.emit('userJoined', {
                    room: this.getCurrentRoom,
                    user: this.getUserData,
                    content: `${this.getUserData.username} joined ${this.getCurrentRoom.name}`,
                    admin: true
                });

                /** Socket IO: Received New User Event */
                this.getSocket.on('receivedNewUser', data => {
                    this.messages = JSON.parse(data);
                });

                /** Socket IO: User Exit Event - Check other tabs of the same room and redirect */
                this.getSocket.on('receivedUserExit', room => {
                    this.checkUserTabs(room);
                });

                /** Socket IO: New Messaage Event - Append the new message to the messages array */
                this.getSocket.on('receivedNewMessage', message => {
                    this.messages.push(JSON.parse(message));
                });
            })
            .catch(err => console.log(err));
    },
    beforeDestroy() {
        this.leaveRoom();
        this.getSocket.removeListener('userJoined');
    }
};
</script>


<style lang="scss">
@import '@/assets/scss/views/chat.scss';
</style>
