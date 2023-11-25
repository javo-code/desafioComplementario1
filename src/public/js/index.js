const socketClient = io();

socketClient.on('arrayProducts', (productsArray) => {
    updateProductsView(productsArray);

    const form = document.getElementById('form');
    const inputs = ['title', 'description', 'code', 'price', 'stock', 'category'];

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const product = {};
        
        // para obtener el último ID existente en la lista de productos.
        const lastProductId = Math.max(...productsArray.map((p) => p.id), 0);
        
        // Asigno el nuevo ID al producto.
        product.id = lastProductId + 1;

        // obtengo los valores de los otros campos del formulario.
        inputs.forEach((input) => {
            product[input] = document.getElementById(input).value;
        });

        // valido si el codigo ya existe en los productos actuales.
        const isCodeRepeated = productsArray.some((p) => p.code === product.code);

        if (isCodeRepeated) {
            alert('¡Error! El código del producto ya existe.');
            return;
        }

        // Emitir nuevo producto al servidor.
        socketClient.emit('newProduct', product, (response) => {
            if (response.success) {
                console.log('Producto agregado correctamente:', response.product);
                updateProductsView(response.updatedProducts);
            } else {
                console.error('Error al agregar el producto:', response.error);
            }
        });

        // Limpiar campos del formulario después de enviar el producto.
        inputs.forEach((input) => {
            document.getElementById(input).value = '';
        });
    });
});

// actualizo lista de productos.
function updateProductsView(productsArray) {
    const productsElement = document.getElementById('products');
    let infoProducts = '';

    productsArray.forEach((p, index) => {
        infoProducts += `<div class="product product-${index + 1}" data-product-id="${p.id}">
                            <strong>ID:</strong> ${p.id} <br>
                            <strong>Nombre:</strong> ${p.title} <br>
                            <strong>Detalle:</strong> ${p.description} <br>
                            <strong>Código del Producto:</strong> ${p.code} <br>
                            <strong>Précio:</strong> $${p.price} <br>
                            <strong>Stock Disponible:</strong> ${p.stock} <br>
                            <strong>Categoría:</strong> ${p.category} <br>
                            <button class="btn-delete" data-product-id="${p.id}">Eliminar</button>
                            <br>
                        </div>`;
    });

    productsElement.innerHTML = infoProducts;

    // ELIMINAR PRODUCTOS.
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const productIdToDelete = button.dataset.productId;
            socketClient.emit('deleteProduct', productIdToDelete);
        });
    });
}

let username = null;

if (!username) {
  Swal.fire({
    title: "¡Welcome to chat!",
    text: "Isert your username",
    input: "text",
    inputValidator: (value) => {
      if (!value) return "¡Your username is required!";
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
        text: `${username} is logged in`,
        duration: 3000,
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

socket.on('chat:typing', (data)=>{
    actions.innerHTML = `<p>${data} is writing a message...</p>`
});