
const ordersString = localStorage.getItem('cartProducts_order');
const orderPlace = document.getElementsByClassName("orders")[0];

let finalPrice = 0;
if (ordersString) {
    const orders = JSON.parse(ordersString);

    const printPrice = document.createElement("div");

    console.log(orders);

    orders.forEach(order => {
        const product = document.createElement("div");
        const quantity = document.createElement("div");
        const title = document.createElement("div");
        const price = document.createElement("div");
        const quantityButtons = document.createElement("div");
        const buttonPlus = document.createElement("button");
        const buttonMinus = document.createElement("button");
        const line = document.createElement("hr");

        let currentQuantity = 1;
        let basePrice = order.price;
        quantity.textContent = currentQuantity;
        title.textContent = order.title;
        price.textContent = basePrice.toFixed(2);
        buttonPlus.textContent = "+1";
        buttonMinus.textContent = "-1";

        finalPrice += Number(basePrice.toFixed(2));
        console.log(basePrice);


        product.classList.add("product");
        quantityButtons.classList.add("bothButtons")
        buttonPlus.classList.add("qChange");
        buttonMinus.classList.add("qChange");
        buttonPlus.classList.add("plus");
        buttonMinus.classList.add("minus");

        // buttonPlus.addEventListener("click", () => {
        //     currentQuantity++;
        //     quantity.textContent = currentQuantity; // עדכון התצוגה

        //     price.textContent = (order.price * currentQuantity).toFixed(2);
        //     console.log(order.price);
        //     console.log(Number(order.price));

        //     finalPrice += Number(order.price);
        //     printPrice.textContent = `לתשלום: ${finalPrice.toFixed(2)}`;
        // });

        buttonPlus.addEventListener("click", () => {
            currentQuantity++;
            quantity.textContent = currentQuantity; // עדכון התצוגה

            const newPrice = (order.price * currentQuantity).toFixed(2);
            price.textContent = newPrice;
            console.log(order.price);
            console.log(Number(order.price));

            finalPrice += Number(order.price);
            printPrice.textContent = `לתשלום: ${finalPrice.toFixed(2)}`;

            order.quantity = currentQuantity; // הוסף כמות לפריט
            // const updatedOrders = orders.map(o => {
            //     if (o.catalogId === order.catalogId) {
            //         return { ...o, quantity: currentQuantity }; // עדכן את הכמות
            //     }
            //     return o;
            // });

            let updatedOrders = JSON.parse(localStorage.getItem('cartProducts_order')) || [];

            // דחוף את המוצר החדש
            updatedOrders.push(order);

            // עדכן את ה-localStorage
            localStorage.setItem('cartProducts_order', JSON.stringify(updatedOrders));

        });


        buttonMinus.addEventListener("click", () => {
            if (currentQuantity > 1) {
                currentQuantity--;
                quantity.textContent = currentQuantity; // עדכון התצוגה
                price.textContent = (order.price * currentQuantity).toFixed(2);
                finalPrice -= order.price;
                printPrice.textContent = `לתשלום: ${finalPrice.toFixed(2)}`;
            } else {

                const updatedOrders = orders.filter(o => o.catalogId !== order.catalogId);
                localStorage.setItem('cartProducts_order', JSON.stringify(updatedOrders));

                finalPrice -= order.price;
                printPrice.textContent = `לתשלום: ${finalPrice.toFixed(2)}`;
                product.remove();
                line.remove();
            }
        });


        quantityButtons.appendChild(buttonPlus);
        quantityButtons.appendChild(buttonMinus);
        product.appendChild(quantity);
        product.appendChild(title);
        product.appendChild(price);
        product.appendChild(quantityButtons);
        orderPlace.appendChild(product);
        orderPlace.appendChild(line);

        console.log(finalPrice);
    });

    console.log(typeof finalPrice);
    printPrice.textContent = `לתשלום: ${finalPrice.toFixed(2)}`;
    printPrice.style.marginRight = "30px";
    printPrice.style.marginTop = "30px";

    orderPlace.appendChild(printPrice);


} else {
    console.log('No orders found in local storage.');
}


const sendButton = document.getElementById("submit");

sendButton.addEventListener("click", () => {
    console.log("sdfghj");
    setTimeout(() => {
        orderPlace.innerHTML = '✅'
    }, 500);
    localStorage.clear(); 
})


