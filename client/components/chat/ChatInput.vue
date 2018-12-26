<template>
    <div class="chat__input">
        <textarea
            class="chat__input-control"
            placeholder="Type a Message"
            v-model.trim="content"
            v-on:keyup="triggerMessageSend"
            data-gramm_editor="false"
        ></textarea>
        <button class="btn btn--clear btn--info m-0 u-border-rad-0" @click="sendMessage">Send</button>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
    name: 'ChatInput',
    data: function() {
        return {
            content: ''
        };
    },
    computed: {
        ...mapGetters(['getUserData', 'getCurrentRoom', 'getSocket'])
    },
    methods: {
        triggerMessageSend(e) {
            e.preventDefault();
            if (e.keyCode === 13 && !e.shiftKey) {
                this.sendMessage();
            } else {
                if (this.content !== '') {
                    this.getSocket.emit('userTyping', {
                        room: this.getCurrentRoom,
                        user: this.getUserData
                    });
                } else {
                    this.getSocket.emit('removeUserTyping', {
                        room: this.getCurrentRoom,
                        user: this.getUserData
                    });
                }
            }
        },
        sendMessage() {
            this.getSocket.emit('newMessage', {
                room: this.getCurrentRoom,
                user: this.getUserData,
                content: this.content
            });
            this.content = '';
        }
    },
    mounted() {}
};
</script>


<style lang="scss" scoped>
</style>
