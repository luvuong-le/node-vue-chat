<template>
  <div class="page roomList">
    <section class="section">
      <div class="section__heading mt-3">
        <span class="section__title">Room List</span>
      </div>
      <div class="section__content">
        <p class="section__lead">Enter a room and start chatting!</p>
        <div class="rooms">
          <ul class="rooms__list">
            <li v-for="(room, index) in rooms" :key="index" class="rooms__list-item">
              <a href="#" class="rooms__list-item-link" @click.prevent="handleRoomClick(room)">
                <div class="rooms__item-container">
                  <div class="rooms__item-details">
                    <p>{{ room.name }}</p>
                    <p
                      :class="{ public: room.access, private: !room.access}"
                    >{{ room.access === true ? 'Public': 'Private' }}</p>
                    <p>
                      <strong>Users:</strong>
                      {{ room.users.length }}
                    </p>
                    <p>
                      <strong>Room Admin:</strong>
                      {{ room.user.username }}
                    </p>
                  </div>
                  <div class="rooms__item-actions">
                    <div v-show="getUserData._id === room.user._id" class="rooms__item-action">
                      <a @click="handleDelete" :name="room.name" class="btn btn--danger">Delete</a>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
          <!-- Private Room Enter Modal -->
          <Modal name="private-room" ref="privateRoom">
            <div slot="header">
              <h2 class="text-upper">Enter {{ this.privateRoomName || 'Private Room' }}</h2>
            </div>
            <div slot="body">
              <transition
                name="fade"
                enter-active-class="animated zoomInDown"
                leave-active-class="animated slideOutRight"
                mode="out-in"
              >
                <div v-show="errors.length !== 0" class="form__error">
                  <transition
                    name="fade"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut"
                    mode="out-in"
                  >
                    <span v-for="(error, index) in errors" v-bind:key="index">{{ error }}</span>
                  </transition>
                </div>
              </transition>
              <form @submit="handlePrivateRoomCheck" slot="body" class="form form--nbs p-0 pt-3">
                <div class="form__input-group">
                  <ion-icon name="pricetags" class="form__icon"></ion-icon>
                  <input
                    type="password"
                    name="password"
                    class="form__control"
                    placeholder="Enter Password"
                    v-model.trim="privateRoomPassword"
                  >
                  <label for="password" class="form__label">Password</label>
                </div>

                <button type="submit" class="btn btn--clear btn--info">Enter Room</button>
              </form>
            </div>
          </Modal>
          <!-- Create Room Modal -->
          <Modal name="create-room" ref="createRoom">
            <div slot="header">
              <h2 class="text-upper">Create Room</h2>
            </div>
            <div slot="body">
              <transition
                name="fade"
                enter-active-class="animated zoomInDown"
                leave-active-class="animated slideOutRight"
                mode="out-in"
              >
                <div v-show="errors.length !== 0" class="form__error">
                  <transition
                    name="fade"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut"
                    mode="out-in"
                  >
                    <span v-for="(error, index) in errors" v-bind:key="index">{{ error }}</span>
                  </transition>
                </div>
              </transition>
              <form @submit="handleSubmit" slot="body" class="form form--nbs p-0 pt-3">
                <div class="form__input-group">
                  <ion-icon name="pricetags" class="form__icon"></ion-icon>
                  <input
                    type="text"
                    name="room_name"
                    class="form__control"
                    placeholder="Enter Room Name"
                    v-model.trim="room_name"
                  >
                  <label for="room_name" class="form__label">Room Name</label>
                </div>
                <div class="form__input-group">
                  <ion-icon name="pricetags" class="form__icon"></ion-icon>
                  <input
                    type="password"
                    name="password"
                    class="form__control"
                    placeholder="Enter Password"
                    pattern=".{5,10}"
                    title="Password must be between 5 and 15 characters"
                    v-model.trim="password"
                  >
                  <label for="password" class="form__label">Password (Optional)</label>
                </div>

                <button type="submit" class="btn btn--clear btn--danger">Create Room</button>
              </form>
            </div>
          </Modal>
          <div class="rooms__actions">
            <a @click="openModal" class="btn btn--info">Create Room</a>
            <a @click="fetchRoomData" class="btn btn--info">Refresh Rooms</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import Modal from '@/components/layout/Modal';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'RoomList',
    components: {
        Modal: Modal
    },
    data: function() {
        return {
            rooms: null,
            room_name: null,
            privateRoomName: null,
            password: null,
            privateRoomPassword: null,
            errors: []
        };
    },
    computed: {
        ...mapGetters(['getUserData', 'getRoomData'])
    },
    methods: {
        ...mapActions(['updateRoomData', 'addRoom', 'deleteRoom']),
        fetchRoomData() {
            axios
                .get('/api/room')
                .then(res => {
                    console.log(res.data);
                    this.$store.dispatch('updateRoomData', res.data);
                    this.rooms = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        openModal() {
            this.$refs.createRoom.open();
        },
        handleSubmit(e) {
            e.preventDefault();

            axios
                .post('/api/room', {
                    room_name: this.room_name,
                    password: this.password
                })
                .then(res => {
                    if (res.data.errors) {
                        for (const error of res.data.errors) {
                            const [value] = Object.values(error);
                            this.errors.push(value);
                        }
                    } else {
                        this.rooms.push(res.data);
                        this.$store.dispatch('addRoom', res.data);
                        this.room_name = null;
                        this.password = null;
                        this.$refs.createRoom.close();
                    }
                })
                .catch(err => {
                    console.log(err);
                });

            setTimeout(() => {
                this.errors = [];
            }, 1500);
        },
        handleDelete(e) {
            e.preventDefault();
            axios
                .delete(`/api/room/${e.target.name}`)
                .then(res => {
                    console.log(res.data);
                    this.rooms = this.rooms.filter(room => room._id !== res.data._id);
                    this.$store.dispatch('deleteRoom', res.data);
                })
                .catch(err => console.log(err));
        },
        handleRoomClick(room) {
            if (room.access) {
                this.$router.push({ name: 'Room', params: { roomname: room.name } });
            } else {
                this.privateRoomName = room.name;
                this.$refs.privateRoom.setData('room', room);
                this.$refs.privateRoom.open();
            }
        },
        handlePrivateRoomCheck(e) {
            e.preventDefault();
            axios
                .post('/api/room/verify', {
                    room_name: this.$refs.privateRoom.modalData.room.name,
                    password: this.privateRoomPassword
                })
                .then(res => {
                    if (res.data.errors) {
                        for (const error of res.data.errors) {
                            const [value] = Object.values(error);
                            this.errors.push(value);
                        }
                    } else {
                        if (res.data.success) {
                            this.$router.push({
                                name: 'Room',
                                params: { roomname: this.$refs.privateRoom.modalData.room.name }
                            });
                        }
                    }

                    setTimeout(() => {
                        this.errors = [];
                    }, 1500);
                })
                .catch(err => console.log(err));
        }
    },
    mounted() {
        this.fetchRoomData();
    }
};
</script>

<style lang="scss">
@import '@/assets/scss/views/rooms.scss';
</style>
