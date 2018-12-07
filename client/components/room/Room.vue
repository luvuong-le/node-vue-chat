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
								<ul class="chat__userlist">
									<li class="chat__user">
										<div class="chat__user-item">
											<img src="https://img.icons8.com/color/48/000000/user.png" class="chat__user-avatar" alt>
											<div class="chat__user-details">
												<span>Test User 4</span>
											</div>
										</div>
									</li>
									<li class="chat__user">
										<div class="chat__user-item">
											<img src="https://img.icons8.com/color/48/000000/user.png" class="chat__user-avatar" alt>
											<div class="chat__user-details">
												<span>Test User 2</span>
											</div>
										</div>
									</li>
									<li class="chat__user">
										<div class="chat__user-item">
											<img src="https://img.icons8.com/color/48/000000/user.png" class="chat__user-avatar" alt>
											<div class="chat__user-details">
												<span>Test User 3</span>
											</div>
										</div>
									</li>
								</ul>
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
			room_name: null
		};
	},
	computed: {
		...mapGetters(['getUserData', 'getCurrentRoom', 'getSocket'])
	},
	method: {
		...mapActions(['saveCurrentRoom'])
	},
	created() {
		if (this.getCurrentRoom === null) {
			axios
				.get(`/api/room/${this.$route.params.roomname}`)
				.then(res => {
					this.$store.dispatch('saveCurrentRoom', res.data);
					this.getSocket.emit('joinRoom', {
						room: this.getCurrentRoom,
						user: this.getUserData
					});
					this.getSocket.on('userJoined', data => {
						console.log(`${data} Joined Room`);
					});
				})
				.catch(err => console.log(err));
		} else {
			this.getSocket.emit('joinRoom', { room: this.getCurrentRoom, user: this.getUserData });
			this.getSocket.on('userJoined', data => {
				console.log(`Admin: ${data} Joined ${this.getCurrentRoom.name}`);
			});
		}
	},
	mounted() {
		this.room_name = this.$route.params.roomname;
	},
	beforeDestroy() {
		this.getSocket.removeListener('userJoined');
	}
};
</script>


<style lang="scss">
@import '@/assets/scss/views/chat.scss';
</style>
