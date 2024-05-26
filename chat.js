// chat.js

document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');

    // Handle sending messages
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            socket.emit('chat message', messageText);
            messageInput.value = '';
        }
    }

    // Listen for incoming messages
    socket.on('chat message', (msg) => {
        addMessage('User', msg);
    });

    function addMessage(username, text) {
        const message = document.createElement('div');
        message.classList.add('message');
        message.innerHTML = `<span class="username">${username}:</span><span class="text">${text}</span>`;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
    }
});
