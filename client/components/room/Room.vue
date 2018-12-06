<template>
  <div class="page room">
    <section class="section">
      <div class="section__content">
        <div class="chat">
          <UserList/>
          <div class="chat__content">
            <div class="chat__header">
              <span class="section__title">{{ room_name }}</span>
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
import UserList from '../chat/UserList.vue';
import MessageList from '../chat/MessageList.vue';
import ChatInput from '../chat/ChatInput.vue';

export default {
    name: 'Room',
    components: {
        UserList,
        MessageList,
        ChatInput
    },
    data: function() {
        return {
            room_name: null
        };
    },
    mounted() {
        this.room_name = this.$route.params.roomname;
    }
};
</script>


<style lang="scss">
</style>
