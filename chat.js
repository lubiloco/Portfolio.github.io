// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    // DOM elements
    const chatBox = document.getElementById('chat-box');
    const chatForm = document.getElementById('chat-form');
    const msgInput = document.getElementById('msg');
    const typing = document.getElementById('typing');

    // Prompt for username
    const user = prompt('Enter your name:');

    // Emit typing event
    msgInput.addEventListener('input', () => {
        socket.emit('typing', user);
    });

    // Listen for typing event
    socket.on('typing', (user) => {
        typing.innerText = `${user} is typing...`;
        setTimeout(() => {
            typing.innerText = '';
        }, 2000); // Clear after 2 seconds
    });

    // Listen for messages
    socket.on('chat message', (msg) => {
        const item = document.createElement('div');
        item.textContent = `${msg.user}: ${msg.message}`;
        chatBox.appendChild(item);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
    });

    // Submit message
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = msgInput.value.trim();
        if (msg) {
            socket.emit('chat message', { user, message: msg });
            msgInput.value = '';
        }
    });
});
