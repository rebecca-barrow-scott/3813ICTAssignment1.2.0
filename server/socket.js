module.exports = {
    connect: function(io, PORT, db, app){
        var channelID = []
        db.collection('channels').find({}).toArray().then(function(channels){
            for(channel of channels){
                channelID.push(channel.id)
            }
        });
        var socketRoom = []
        var socketRoomNum = []

        const namespace = io.of("/group")

        namespace.on('connection', (socket)=>{
            //new message
            socket.on("message", (message) => {
                for (i=0; i<socketRoom.length; i++){
                    if(socketRoom[i][0] == socket.id){
                        namespace.to(socketRoom[i][1]).emit('message', message);
                    }
                }
            })

            socket.on('joinChannel', (userChannel) => {
                userChannel.channel_id = parseInt(userChannel.channel_id)
                if(channelID.includes(userChannel.channel_id)){
                    socket.join(userChannel.channel_id, () => {
                        var inroom = false
                        for(i=0; i<socketRoom.length; i++){
                            if(socketRoom[i][0]==socket.id){
                                socketRoom[i][1]=userChannel.channel_id
                                console.log('in room')
                                inroom = true
                            }
                        }
                        if (inroom==false){
                            socketRoom.push([socket.id, userChannel.channel_id]);
                            var hasroomnum = false

                            for(j=0; j<socketRoomNum.length; j++){
                                if(socketRoomNum[j][0] == userChannel.channel_id){
                                    socketRoomNum[j][1] = socketRoomNum[j][1] + 1
                                    hasroomnum = true
                                }
                            }

                            if (!hasroomnum){
                                socketRoomNum.push([userChannel.channel_id, 1])
                            }
                        }
                        namespace.in(userChannel.channel_id).emit("notice", userChannel.user_id + " has joined the conversation!")
                    });
                    return namespace.in(userChannel.channel_id).emit("joined", userChannel.channel_id);
                }
            });

            socket.on('leaveChannel', (userChannel) => {
                for(i=0; i<socketRoom.length; i++){
                    if(socketRoom[i][0]==socket.id){
                        socketRoom.splice(i, 1)
                        socket.leave(userChannel.channel_id)
                        namespace.to(userChannel.channel_id).emit("notice", userChannel.user_id + " has left the building")
                    }
                }
                for(j=0; j<socketRoomNum.length; j++){
                    if(socketRoomNum[j][0] == userChannel.channel_id){
                        socketRoomNum[j][1] = socketRoomNum[j][1] - 1
                        if(socketRoomNum[j][1] == 0){
                            socketRoomNum.splice(j, 1)
                        }
                    }
                }
            });

            socket.on('addChannel', (channel_id) => {
                channelID.push(parseInt(channel_id))
            });

            socket.on('removeChannel', (channel_id) => {
                var index = channelID.indexOf(parseInt(channel_id))
                if (index > -1){
                    channelID.splice(index, 1)
                }
            });
        });
    }
} 