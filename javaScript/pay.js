
const ordersString = localStorage.getItem('orders');

if (ordersString) {
    const orders = JSON.parse(ordersString);

    console.log(orders);

    orders.forEach(order => {
        const product = document.createElement("div");
    });
} else {
    console.log('No orders found in local storage.');
}




