const { group } = require("console")
const { consoleTestResultHandler } = require("tslint/lib/test")

module.exports = {
    connect: function(io, PORT, db, app){
        // this should only work with the channels in group 1 
        var channelID = ['1', '2', '3']
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
                console.log('hit join')
                if(channelID.includes(userChannel.channel_id)){
                    socket.join(userChannel.channel_id, () => {
                        var inroom = false
                        for(i=0; i<socketRoom.length; i++){
                            if(socketRoom[i][0]==socket.id){
                                socketRoom[i][1]=userChannel.channel_id
                                inroom = true
                            }
                        }
                        if (!inroom){
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
                console.log('leave channel');

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

            socket.on('activeUsers', (userChannel) => {
                console.log('active users')
                var total = 0
                for(j=0; j<socketRoomNum.length; j++){
                    if(socketRoomNum[j][0] == userChannel.channel_id){
                        total = socketRoomNum[j][1]
                    }
                }
                console.log(total)
                namespace.to(userChannel.channel_id).emit("activeUsers", total)
            });

        });
    }
}