const socket = io();

let username = null;

if (!username) {
  Swal.fire({
    title: "Bienvenido al chat!",
    text: "Ingrese su nombre de usuario",
    input: "text",
    inputValidator: (value) => {
      if (!value) return "¡Debes poner un nombre, cara de mono!";
    },
  }).then((input) => {
    username = input.value;
    socket.emit("newUser", username);
  });
}

const message = document.getElementById("message");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const actions = document.getElementById("actions");

btn.addEventListener("click", () => {
  socket.emit("chat:message", {
    username,
    message: message.value,
  });
  message.value = "";
});

socket.on("messages", (data) => {
  actions.innerHTML = "";
  const chatRender = data
    .map((msg) => {
      return `<p><strong> ${msg.username} </strong>: ${msg.message} </p>`;
    })
    .join(" ");
  output.innerHTML = chatRender;
});

socket.on('newUser', (username)=>{
    Toastify({
        text: `${username} entró al chat`,
        duration: 2000,
        close: true,
        // destination: 'http.....'
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)"
        }
    }).showToast();
});

message.addEventListener('keypress', ()=>{
    socket.emit('chat:typing', username)
});

message.addEventListener('', ()=>{
    socket.emit('chat:typing', username)
});

socket.on('chat:typing', (user)=>{
    actions.innerHTML = `<p>${user} escribiendo...</p>`
});