const socket = io();

console.log('Allright')
console.log(socket)

socket.on('msgToClient', payload => {
    console.log('PayLoad: ', payload)
})