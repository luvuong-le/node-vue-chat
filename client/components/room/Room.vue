<template>
    <div class="page room">
        <section class="section p-0">
            <div class="section__content u-max-height">
                <div class="chat">
                    <Sidebar name="userlist" ref="userList">
                        <template slot="header">
                            <div>
                                <ion-icon name="person" class="icon"></ion-icon>
                            </div>
                            <span class="section__title">Online Users</span>
                        </template>
                        <template slot="body">
                            <input
                                type="text"
                                class="rooms__search-input"
                                placeholder="Search user by name"
                                v-model.trim="searchInput"
                            >
                            <ul class="chat__userlist" v-if="this.getCurrentRoom">
                                <transition-group name="slideDown">
                                    <li
                                        class="chat__user"
                                        v-for="(user, i) in this.filteredUsers"
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
                                </transition-group>
                            </ul>
                        </template>
                        <template slot="footer">
                            <button
                                @click="leaveRoom"
                                class="btn btn--clear btn--danger center"
                            >Leave Room</button>
                        </template>
                    </Sidebar>
                    <div class="chat__content" v-bind:class="{ mlzero: !sidebarVisible }">
                        <div class="chat__header" v-if="room">
                            <span class="section__title"># {{ room.name }}</span>
                            <div class="chat__actions">
                                <ion-icon name="return-left" @click="leaveRoom" class="icon"></ion-icon>
                                <ion-icon name="create" @click="openEditRoom" class="icon"></ion-icon>
                                <ion-icon name="analytics" @click="viewRoomDetails" class="icon"></ion-icon>
                                <ion-icon name="people" @click="toggleUserList" class="icon"></ion-icon>
                            </div>
                        </div>
                        <MessageList :messages="messages"/>
                        <ChatInput/>
                    </div>
                </div>
            </div>
            <Modal name="editRoom" ref="editRoom" v-if="this.getCurrentRoom">
                <template slot="header">
                    <h2 class="text-upper">Edit Room: {{ this.getCurrentRoom.name }}</h2>
                </template>
                <template slot="body">
                    <form @submit="handleEditRoom" slot="body" class="form form--nbs p-0 pt-3">
                        <div class="form__input-group">
                            <ion-icon name="pricetags" class="form__icon"></ion-icon>
                            <input
                                type="text"
                                name="roomName"
                                class="form__control"
                                placeholder="Enter New Room Name"
                                pattern=".{3,20}"
                                required
                                v-model.trim="newRoomName"
                            >
                            <label for="roomName" class="form__label">New Room name</label>
                        </div>

                        <button type="submit" class="btn btn--clear btn--info">Update Room Name</button>
                    </form>
                </template>
            </Modal>
            <Modal name="roomDetails" ref="roomDetails" v-if="this.getCurrentRoom && messages">
                <template slot="header">
                    <h2 class="lead text-upper">Room Details: {{ this.getCurrentRoom.name }}</h2>
                </template>
                <template slot="body">
                    <div class="infobox">
                        <div class="infobox__item">
                            <ion-icon name="contact" class="icon icon-lg"></ion-icon>
                        </div>
                        <div class="infobox__item">
                            <span class="infobox__item--left">Online Users</span>
                            <span
                                class="infobox__item--right"
                            >{{ this.getCurrentRoom.users.length }}</span>
                        </div>
                        <div class="infobox__item">
                            <span class="infobox__item--left">Messages</span>
                            <span class="infobox__item--right">{{ messages.length }}</span>
                        </div>
                        <div class="infobox__item">
                            <span class="infobox__item--left">Room Admin</span>
                            <span
                                class="infobox__item--right"
                            >{{ this.getCurrentRoom.user.username }}</span>
                        </div>
                        <div class="infobox__item">
                            <span class="infobox__item--left">Created</span>
                            <span
                                class="infobox__item--right"
                            >{{ moment(this.getCurrentRoom.created_at).fromNow() }}</span>
                        </div>
                    </div>
                </template>
            </Modal>
        </section>
    </div>
</template>


<script>
import axios from 'axios';
import MessageList from '../chat/MessageList.vue';
import ChatInput from '../chat/ChatInput.vue';
import Sidebar from '../layout/Sidebar.vue';
import Modal from '../layout/Modal.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Room',
    components: {
        MessageList,
        ChatInput,
        Sidebar,
        Modal
    },
    data: function() {
        return {
            room: null,
            users: null,
            messages: null,
            newRoomName: '',
            sidebarVisible: true,
            searchInput: ''
        };
    },
    computed: {
        ...mapGetters(['getUserData', 'getCurrentRoom', 'getSocket']),
        filteredUsers() {
            return this.getCurrentRoom.users
                .slice()
                .sort(this.sortAlphabetical)
                .filter(user =>
                    user.username.toLowerCase().includes(this.searchInput.toLowerCase())
                );
        }
    },
    methods: {
        ...mapActions(['saveCurrentRoom']),
        checkUserTabs(room) {
            if (room && room.users.findIndex(user => user._id === this.getUserData._id) === -1) {
                this.$router.push({ name: 'RoomList' });
            }
        },
        sortAlphabetical(a, b) {
            let roomA = a.name.toUpperCase();
            let roomB = b.name.toUpperCase();
            if (roomA < roomB) {
                return -1;
            }
            if (roomA > roomB) {
                return 1;
            }
            return 0;
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
        },
        openEditRoom() {
            this.$refs.editRoom.open();
        },
        handleEditRoom(e) {
            e.preventDefault();
            axios
                .post('/api/room/update/name', {
                    room_name: this.getCurrentRoom.name,
                    new_room_name: this.newRoomName
                })
                .then(res => {
                    this.$refs.editRoom.close();
                    this.getSocket.emit('roomUpdateEvent', {
                        oldRoomName: this.getCurrentRoom.name,
                        room: res.data
                    });
                    this.getSocket.emit('newMessage', {
                        room: this.getCurrentRoom,
                        user: this.getUserData,
                        admin: true,
                        content: `${this.getUserData.username} updated room ${
                            this.getCurrentRoom.name
                        } to ${this.newRoomName}`
                    });
                    this.newRoomName = '';
                })
                .catch(err => console.log(err));
        },
        viewRoomDetails() {
            this.$refs.roomDetails.open();
        },
        toggleUserList() {
            console.log('Toggling User List');
            this.$refs.userList.toggle();
            this.sidebarVisible = !this.sidebarVisible;
        }
    },
    created() {
        axios
            .get(`/api/room/${this.$route.params.id}`)
            .then(res => {
                this.room = res.data;
                this.users = res.data.users;
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

                /** Socket IO: Room Deleted Event - Redirect all users */
                this.getSocket.on('roomDeleted', () => {
                    this.$store.dispatch('saveCurrentRoom', null);
                    setTimeout(() => {
                        this.$router.push({ name: 'RoomList' });
                    }, 2000);
                });

                /** Socket IO: Room Updated Event */
                this.getSocket.on('roomUpdated', data => {
                    this.room = JSON.parse(data).room;
                    this.$store.dispatch('saveCurrentRoom', JSON.parse(data).room);
                });
            })
            .catch(err => console.log(err));
    },
    beforeDestroy() {
        // if (this.getCurrentRoom) {
        //     this.leaveRoom();
        // }
        this.getSocket.removeListener('userJoined');
    },
    mounted() {}
};
</script>


<style lang="scss">
@import '@/assets/scss/views/chat.scss';
@import '@/assets/scss/components/infobox.scss';
</style>
