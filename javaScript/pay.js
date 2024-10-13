
// get the information from the localStorage
const ordersString = localStorage.getItem('cartProducts_order');
const orderPlace = document.getElementsByClassName("orders")[0];

let finalPrice = 0;

// if the local is'nt empty
if (ordersString) {
    const orders = JSON.parse(ordersString);
    const productCount = {};

    // count the products
    orders.forEach(product => {
        // if exit - add to the count
        if (productCount[product.catalogId]) {
            productCount[product.catalogId].count += 1;
        } else {
            // if new - create an object
            productCount[product.catalogId] = { ...product, count: 1 };
        }
    });
    const uniqueProducts = Object.values(productCount);

    const printPrice = document.createElement("div");

    // show the info about any product
    uniqueProducts.forEach(order => {
        // create its place on the document
        const product = document.createElement("div");
        const quantity = document.createElement("div");
        const title = document.createElement("div");
        const price = document.createElement("div");
        const quantityButtons = document.createElement("div");
        const buttonPlus = document.createElement("button");
        const buttonMinus = document.createElement("button");
        const line = document.createElement("hr");

        // inject the content
        let currentQuantity = order.count;
        let basePrice = order.price;
        quantity.textContent = currentQuantity;
        title.textContent = order.title;
        price.textContent = `${basePrice.toFixed(2)} ₪`;
        buttonPlus.textContent = "+1";
        buttonMinus.textContent = "-1";

        finalPrice += (Number(basePrice) * currentQuantity.toFixed(2));

        // add classes
        product.classList.add("product");
        quantityButtons.classList.add("bothButtons")
        buttonPlus.classList.add("qChange");
        buttonMinus.classList.add("qChange");
        buttonPlus.classList.add("plus");
        buttonMinus.classList.add("minus");

        // add one more of the product
        buttonPlus.addEventListener("click", () => {
            currentQuantity++;
            quantity.textContent = currentQuantity;

            const newPrice = (order.price * currentQuantity).toFixed(2);
            price.textContent = `${newPrice} ₪`;

            finalPrice += Number(order.price);
            printPrice.textContent = `לתשלום: ${finalPrice.toFixed(2)} ₪`;

            order.quantity = currentQuantity;

            let updatedOrders = JSON.parse(localStorage.getItem('cartProducts_order')) || [];
            updatedOrders.push(order);
            localStorage.setItem('cartProducts_order', JSON.stringify(updatedOrders));

        });

        // decrease one of the product
        buttonMinus.addEventListener("click", () => {
            if (currentQuantity > 1) {
                const index = orders.indexOf(order.catalogId);
                orders.splice(index, 1);
                localStorage.setItem('cartProducts_order', JSON.stringify(orders));
                currentQuantity--;
                quantity.textContent = currentQuantity;
                price.textContent = `${(order.price * currentQuantity).toFixed(2)} ₪`;
                finalPrice -= order.price;
                printPrice.textContent = `לתשלום: ${finalPrice.toFixed(2)} ₪`;
            } else {
                // to delete the last product
                const updatedOrders = orders.filter(o => o.catalogId !== order.catalogId);
                localStorage.setItem('cartProducts_order', JSON.stringify(updatedOrders));
                finalPrice -= order.price;
                printPrice.textContent = `לתשלום: ${finalPrice.toFixed(2)} ₪`;
                product.remove();
                line.remove();
            }
        });

        // add all the info to the screen
        quantityButtons.appendChild(buttonPlus);
        quantityButtons.appendChild(buttonMinus);
        product.appendChild(quantity);
        product.appendChild(title);
        product.appendChild(price);
        product.appendChild(quantityButtons);
        orderPlace.appendChild(product);
        orderPlace.appendChild(line);
    });

    printPrice.textContent = `לתשלום: ${finalPrice.toFixed(2)} ₪`;
    printPrice.style.marginRight = "30px";
    printPrice.style.marginTop = "30px";

    orderPlace.appendChild(printPrice);
}

// pay for the purchase
const sendButton = document.getElementById("submit");

sendButton.addEventListener("click", () => {
    debugger
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    if (address && phone) {
        setTimeout(() => {
            orderPlace.innerHTML = '✅';
            customerInfo.reset();
        }, 500);
        localStorage.clear();
    } else {
        alert("יש להשלים את כל השדות");
    }

})


