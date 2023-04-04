const API_KEY = '1427310-b647cab15d10d7656260ab332';
const URL = "https://pixabay.com/api/";
let url;

// Я не розумію як зробити тут 1 функцію.
// Опишу свою логіку, я роблю пошук, відразу записую посилання пошуку у змінну url, гортаю наприклад до 10 сторінки, потім вмикаю фільтр пошуку тільки фото, в мене спрацьовує функція searchImagesFilterType, в яку я передаю нове значення сторінки "1", і значення обраного фільтру, потім спрацьовує urlUpDate, де я видаляю дані про сторінку і додаю новий аргумент до вже існуючої змінної (посилання), все як на мене досить логічно. 
// А от як усе це зібрати в 1 функцію, як що приходить новий запит, мені потрібно виходить зберігати десь попередній запит на функцію, динамічно його редагувати із додаванням нових аргументів і ініціалізувати запуск. В принципі я теоретично здогадуюсь як це можна зробити, але чесно кажучи не дуже хочу ламати те що так довго робив ще й варіант працює.
// UPD спробував зробити, не вийшло, але буду вдячний за приклад, я б з радістю подивися на правильну реалізацію.

export function searchImages(name, page, per_page = 40) {
    const parameters = new URLSearchParams({
        key: API_KEY,
        q: encodeURIComponent(name),
        safesearch: true,
        per_page,
        page,
    });

    url = `${URL}?${parameters}`;
    return fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(response.status);
            }
            return res.json()
        })
};

export function searchImagesFilterOrientation(orientation = 'all', page = 1) {
    const parameters = new URLSearchParams({
        orientation,
        page
    });
    return fetchF(url, parameters)
};

export function searchImagesFilterСolors(colors, page = 1) {
    const parameters = new URLSearchParams({
        colors,
        page
    });
    return fetchF(url, parameters)

};
export function searchImagesFilterType(image_type = "all", page = 1) {
    const parameters = new URLSearchParams({
        image_type,
        page
    });
    const fetchSearch = fetchF(url, parameters);
    return fetchSearch;
}

export function searchImagesFilterCategory(category, page = 1) {
    const parameters = new URLSearchParams({
        category,
        page
    });
    return fetchF(url, parameters)
};

async function fetchF(url, parameters) {
    const response = await fetch(urlUpDate(url, parameters));
    if (!response.ok) {
        throw new Error(response.status);
    }
    const data = await response.json();
    return data;
}

function urlUpDate(originalUrl, parameters) { // функція для оновлення посилання і видалення page
    const newUrl = `${originalUrl.replace(new RegExp('page=[1-9]+', 'g'), '')}${parameters}`
    url = newUrl
    console.log(url)
    return url;
}