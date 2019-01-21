const {
    ADD_MESSAGE,
    GET_MESSAGES,
    UPDATE_ROOM_USERS,
    GET_ROOMS,
    GET_ROOM_USERS
} = require('../actions/socketio');

module.exports = {
    JOIN_ROOM: (socket, data) => {
        socket.join(data.room._id, async () => {
            /** Get list of messages to send back to client */
            socket.emit(
                'updateRoomData',
                JSON.stringify({
                    messages: await GET_MESSAGES(data),
                    room: await UPDATE_ROOM_USERS(data)
                })
            );

            /** Get Room to update user list for all other clients */
            socket.broadcast
                .to(data.room._id)
                .emit('updateUserList', JSON.stringify(await GET_ROOM_USERS(data)));

            /** Emit event to all clients in the roomlist view except the sender */
            socket.broadcast.emit(
                'updateRooms',
                JSON.stringify({
                    room: await GET_ROOMS()
                })
            );

            /** Emit back the message */
            socket.broadcast.to(data.room._id).emit(
                'receivedNewMessage',
                JSON.stringify(
                    await ADD_MESSAGE({
                        room: data.room,
                        user: false,
                        content: data.content,
                        admin: data.admin
                    })
                )
            );
        });
    }
};
