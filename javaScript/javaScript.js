import data from '../data/products.json' with {type: 'json'}


const products = data.notebooks
// console.log(products);

document.addEventListener('DOMContentLoaded', () => {
    const createCards = () => {
        const grid = document.getElementById("grid");
        for (let i = 0; i < products.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.id = `card${i}`;
            const titleCard = document.createElement('div');
            titleCard.textContent = products[i].title;
            titleCard.classList.add("titleCard");
            card.appendChild(titleCard);
            const div_imgCard = document.createElement("div");
            div_imgCard.classList.add("div_imgCard");
            const imgCard = document.createElement("img");
            imgCard.src = `${products[i].image}`;
            imgCard.classList.add("imgCard");
            div_imgCard.appendChild(imgCard);
            card.appendChild(div_imgCard);
            const buttomCard = document.createElement("div");
            buttomCard.classList.add("buttomCard");
            const RightbuttomCard = document.createElement("button");
            RightbuttomCard.id = `button${i}`;
            const LeftbuttomCard = document.createElement("p");
            RightbuttomCard.textContent = "הוסף לסל";
            LeftbuttomCard.textContent += `${products[i].price}`;
            RightbuttomCard.addEventListener('click', () => {
                addToBag(`card${i}`, i);
            });
            buttomCard.appendChild(RightbuttomCard);
            buttomCard.appendChild(LeftbuttomCard);
            card.appendChild(buttomCard);
            grid.appendChild(card);
        }
    }
    createCards();
});

const addToBag = (cardId, productId) => {
    const product = products[productId];
    let items = JSON.parse(localStorage.getItem(key)) || [];
    const cartProduct = JSON.parse(localStorage.getItem("cartProducts")) || [];
    cartProduct.push(products[productId]);
    localStorage.setItem("cartProducts", JSON.stringify(cartProduct));
}
