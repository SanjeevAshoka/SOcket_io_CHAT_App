console.log("hello");
const socket = io('http://localhost:8000',{ transports: ["websocket"] });
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
console.log("mes cont= ", messageContainer);

const name1 = prompt('Enter you Name to join');
console.log("emitting for new user")
socket.emit('new-user-joined', name1);

const append = (message, position)=>{   
    console.log("Append");
    //positon is left or right
    const msgElement = document.createElement('div');
    msgElement.innerHTML =  `<h3>${message}</h3>`
    msgElement.classList.add('message', position);
    messageContainer.appendChild(msgElement);
}

const audio = new Audio('ding.mp3');
socket.on('user-joined', userName =>{
    append(`${userName} joined chat`, 'right');
})
const appendMessage = (data)=>{
    const msgElement = document.createElement('div');
    msgElement.innerHTML =  `<h3> ${data.name}: ${data.message}</h3>`
    msgElement.classList.add('message', 'left');
    messageContainer.appendChild(msgElement);
    audio.play();
}
socket.on('receive',data=>{
    appendMessage(data)
})

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value=''
})

socket.on('left', (data)=>{
    append(`${data.name}: left`, 'center')
})