
// Объект с ссылками на JSON-данные
const jsonURLs = {
    restoraunts: 'https://raw.githubusercontent.com/cmrt2/test-task/master/restaurants.json'
};

// Функция получения и обработки данных по указанным аргументам
const createRequest = (url, handler) => {
    let request = new XMLHttpRequest();
    request.responseType = 'json';

    request.addEventListener('load', function(){
        handler(request.response)
    });

    request.open('GET', url);    
    request.send();
};


const viewRestoraunts = (jsonObj) => {

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

createRequest(jsonURLs.restoraunts, viewRestoraunts);