const API_KEY = '1427310-b647cab15d10d7656260ab332';
const URL = "https://pixabay.com/api/";

export function searchImages({ name, page, per_page, category, colors, orientation, image_type }) {
    const parameters = new URLSearchParams({
        key: API_KEY,
        q: encodeURIComponent(name),
        safesearch: true,
        page,
        per_page,
        category,
        colors,
        orientation,
        image_type
    });

    return fetch(`${URL}?${parameters}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(response.status);
            }
            return res.json()
        })
};