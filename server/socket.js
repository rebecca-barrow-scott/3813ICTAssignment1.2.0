const { ReactiveFormsModule } = require("@angular/forms")

module.exports = {
    connect: function(io, PORT, db, app){
        // this should only work with the channels in group 1 
        var channelID = [1, 2, 3]
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

            socket.on('joinChannel', (channel) => {
                console.log('hit join')
                if(channelID.includes(channel.id)){
                    socket.join(channel, () => {
                        var inroom = false
                        for(i=0; i<socketRoom.length; i++){
                            if(socketRoom[i][0]==socket.id){
                                socketRoom[i][1]=channel.id
                                inroom = true
                            }
                        }
                        if (!inroom){
                            socketRoom.push([socket.id, channel.id]);
                            var hasroomnum = false

                            for(j=0; j<socketRoomNum.length; j++){
                                if(socketRoomNum[j][0] == channel.id){
                                    socketRoomNum[j][1] = socketRoomNum[j][1] + 1
                                    hasroomnum = true
                                }
                            }
                            if (!hasroomnum){
                                socketRoomNum.push([channel.id, 1])
                            }
                        }
                        namespace.in(channel).emit("notice", "A new user has joined")
                    });
                    return namespace.in(channel).emit("joined", channel);
                }
            })
        });
    }
}