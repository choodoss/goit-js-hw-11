const API_KEY = '1427310-b647cab15d10d7656260ab332';
const URL = "https://pixabay.com/api/";
let url;

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

export function searchImagesFilterOrientation(orientation = 'all', page) {
    const parameters = new URLSearchParams({
        orientation,
        page
    });
    return fetchF(url, parameters)
};

export function searchImagesFilterСolors(colors, page) {
    const parameters = new URLSearchParams({
        colors,
        page
    });
    return fetchF(url, parameters)

};
export function searchImagesFilterType(image_type = "all", page) {
    const parameters = new URLSearchParams({
        image_type,
        page
    });
    const fetchSearch = fetchF(url, parameters);
    return fetchSearch;
}

export function searchImagesFilterCategory(category, page) {
    const parameters = new URLSearchParams({
        category,
        page
    });
    return fetchF(url, parameters)
};

async function fetchF(url, parameters) {
    const response = await fetch(urlUpDate(url, parameters));
    console.log(response)
    if (!response.ok) {
        throw new Error(response.status);
    }
    const data = await response.json();
    return data;
}

function urlUpDate(originalUrl, parameters) {
    console.log(originalUrl)
    console.log(parameters)
    return `${originalUrl.replace(new RegExp('page=1', 'g'), '')}${parameters}`;
}