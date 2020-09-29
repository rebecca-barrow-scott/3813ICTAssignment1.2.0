module.exports = {
    connect: function(io, PORT){
        io.on('connection', (socket)=>{
            socket.on("message", (message) => {
                io.emit("message", message);
            })
        });
    }
}