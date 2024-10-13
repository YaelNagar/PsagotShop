import data from '../data/products.json' with {type: 'json'}


let products = data.craft;
const cartProduct = JSON.parse(localStorage.getItem("cartProducts_order")) || [];
localStorage.clear();

const category1 = document.getElementById("category1").addEventListener("click", () => {
    debugger
    const category = document.getElementById("writingTool").textContent = "כלי כתיבה";
    products = data.craft;
    createCards();
})

const category2 = document.getElementById("category2").addEventListener("click", () => {
    debugger
    const category = document.getElementById("writingTool").textContent = "מחברות";
    products = data.notebooks;
    createCards();
})

document.addEventListener('DOMContentLoaded', () => {
    selector();
    createCards();
});

const createCards = () => {
    const grid = document.getElementById("grid");
    grid.innerHTML = '';
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
        div_imgCard.addEventListener('click', () => {
            showCard(i);
        });
        card.appendChild(div_imgCard);
        //יצירת דיב הכמות, בהתחלה הוא מוסתר
        const notification = document.createElement("div");
        notification.classList.add("hidden");
        notification.classList.add("notification");
        // notification.id = "notification";
        notification.id = `notification${i}`;
        notification.textContent = "1+";
        card.appendChild(notification);
        //תחתית הכרטיס- מחיר והוספה לסל
        const buttomCard = document.createElement("div");
        buttomCard.classList.add("buttomCard");
        const RightbuttomCard = document.createElement("button");
        // RightbuttomCard.id = `button${i}`;
        RightbuttomCard.id = `addButton`;
        const LeftbuttomCard = document.createElement("p");
        RightbuttomCard.textContent = "הוספה לסל";
        RightbuttomCard.classList.add("addToCart")
        LeftbuttomCard.textContent += `${products[i].price}₪`;
        LeftbuttomCard.classList.add("LeftbuttomCard");
        RightbuttomCard.addEventListener('click', () => {
            addToBag(i);
        });
        buttomCard.appendChild(LeftbuttomCard);
        buttomCard.appendChild(RightbuttomCard);
        card.appendChild(buttomCard);
        document.getElementById("grid").appendChild(card);
    }
}

const showCard = (i) => {
    const blackOpacityDiv = document.createElement("div");
    blackOpacityDiv.classList.add("blackOpacityDiv");
    document.getElementsByClassName("allCards")[0].appendChild(blackOpacityDiv);
    let showCard = document.createElement("div");
    showCard.classList.add("showCard");

    const topCard = document.createElement('div');
    topCard.classList.add("buttomCard");
    topCard.style.justifyContent = "space-between";
    const titleCard = document.createElement('div');
    titleCard.textContent = products[i].title;
    titleCard.classList.add("titleCard");
    titleCard.classList.add("m-3");
    topCard.appendChild(titleCard);

    const closeCard = document.createElement("button");
    closeCard.textContent = 'X';
    closeCard.classList.add("m-3");
    closeCard.classList.add("closeCard");
    closeCard.addEventListener('click', () => {
        closeCardShow();
    });
    topCard.appendChild(closeCard);

    showCard.appendChild(topCard);
    const div_imgCard = document.createElement("div");
    div_imgCard.classList.add("div_imgCard");
    const imgCard = document.createElement("img");
    imgCard.src = `${products[i].image}`;
    imgCard.classList.add("imgShowCard");
    div_imgCard.appendChild(imgCard);
    showCard.appendChild(div_imgCard);
    //אם יש תיאור מוצר להציג אותו גם
    if (products[i].description) {
        let Description = document.createElement("p");
        Description.textContent = `${products[i].description}`;
        Description.classList.add("titleCard");
        showCard.appendChild(Description);
    }

    const buttomCard = document.createElement("div");
    buttomCard.classList.add("buttomCard");
    const RightbuttomCard = document.createElement("button");
    RightbuttomCard.id = `button${i}`;
    const LeftbuttomCard = document.createElement("p");
    RightbuttomCard.textContent = "הוסף לסל";
    RightbuttomCard.classList.add("purpleAdd");
    LeftbuttomCard.textContent += `${products[i].price}₪`;
    RightbuttomCard.addEventListener('click', () => {
        addToBag(i);
    });
    buttomCard.appendChild(LeftbuttomCard);
    buttomCard.appendChild(RightbuttomCard);
    showCard.appendChild(buttomCard);
    document.getElementsByClassName("blackOpacityDiv")[0].appendChild(showCard);
}

const addToBag = (cardId, productId) => {
    const product = products[productId];
    let items = JSON.parse(localStorage.getItem(key)) || [];
    const cartProduct = JSON.parse(localStorage.getItem("cartProducts")) || [];
    cartProduct.push(products[productId]);
    localStorage.setItem("cartProducts", JSON.stringify(cartProduct));
}

const closeCardShow = () => {
    const blackOpacityDiv = document.getElementsByClassName("blackOpacityDiv")[0];
    document.getElementsByClassName("allCards")[0].removeChild(blackOpacityDiv);
}

const selector = () => {
    document.getElementById('chosenTypeId').addEventListener('change', function () {
        const selectedValue = this.value;

        // קישור אל הקישור המתאים
        if (selectedValue === 'craft') {
            window.location.href = 'craft'; // אם מדובר בכלי כתיבה
        } else if (selectedValue === 'notebooks') {
            window.location.href = 'notebooks'; // אם מדובר במחברות
        }
    });
}

//בזמן ההוספה הצגת +1
let add_1 = (i) => {
    let notification = document.getElementById(`notification${i}`);
    // מוודא שההודעה לא מוסתרת
    notification.classList.remove('hidden');
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(-30px)';

    // מחכה שניה ואז מוחק את ההודעה
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(0)';
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 500); // זמן ההסרה
    }, 200); // זמן לפני ההסרה
}