class Item {
    constructor (object) {
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                this[key] = object[key];                
            }
        }
    }
}


// Объект с ссылками на JSON-данные
const jsonURLs = {
    restaurants: 'https://raw.githubusercontent.com/cmrt2/test-task/master/restaurants.json'
};

// Функция получения и обработки данных по указанным аргументам
const createRequest = (url, handler) => {
    let request = new XMLHttpRequest();
    request.responseType = 'json';

    request.addEventListener('load', function(){
        
        const templates = request.response.map(element => createShop(element));
        const html = templates.join(' ');
        document.querySelector('.shops__list').innerHTML = html;
        //handler(request.response);
    });

    request.open('GET', url);    
    request.send();
};


const viewRestaurants = (jsonObj) => {

    // Находим template, его контент и создаем новый фрагмент
    const shopsList = document.querySelector('.shops__list');
    const shopTemplate = document.querySelector('#shop-template').content.querySelector('.shops__item');
    const fragment = document.createDocumentFragment();       

    updateText = (node, response) => {
        // Записываем данные в переменные
        let price = response.averagePrice;
        let img = response.images;
        
        // Находим нужные элементы в template
        let shopH3 = node.querySelector('h3');
        let shopPrice = node.querySelector('.price');    
        let shopImg = node.querySelector('.shops__img');
        
        // Выводим на страницу количество знаков рублей
        for(let i = 1; i <= price; i++){
            shopPrice.insertAdjacentHTML('beforeEnd', '&#8381;');
        }

        // Выводим название магазина и его локацию
        shopH3.innerText = response.name + ' — ' + response.location;
        
        // Вставляем картинку
        shopImg.alt = response.name;
        shopImg.src = img.normal;
        shopImg.srcset = img.retina + ' 2x';
    };

    updateArray = (node, array) => {
        let shopKitchens = node.querySelector('.kitchen');
        
        array.forEach(element => {
             let sLi = document.createElement('li');
             sLi.innerText = element;
             shopKitchens.append(sLi);
        });
    };
       
    jsonObj.forEach(element => {
        const shopElement = shopTemplate.cloneNode(true);
        
        updateText(shopElement, element);
        updateArray(shopElement, element.kitchens);
        
        let shopDelivery = shopElement.querySelector('.delivery');
        shopDelivery.innerText = element.timeOfDelivery.join(' — ') + ' min';

        fragment.append(shopElement);
    });

    shopsList.append(fragment);
}

createRequest(jsonURLs.restaurants, viewRestaurants);


//ES6

function createShop (shop) {
    return `
        <div class="shops__item">
            <img class="shops__img" src="${shop.images.normal}" srcset="${shop.images.retina}" alt="">
            <h3>${shop.name}</h3>                        
            <div class="description">
                <span class="description__item price">${shop.averagePrice}</span>
                <ul class="kitchen">${shop.kitchens.join(' • ')}</ul>                
            </div>  
            <p class="delivery">${shop.timeOfDelivery.join(' - ')} Min</p>
        </div>    
    `
};