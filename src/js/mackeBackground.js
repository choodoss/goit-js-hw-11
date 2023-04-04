import { searchImages } from './SearchImages'

const names = [
    "cats",
    "nature",
    "cars",
    "city",
    "beach",
    "fashion",
    "drawings",
    "food",
    "animals",
    "sports",
    "background",
    "birds",
    "romance",
    "technology",
    "space",
    "wedding",
    "music",
    "river",
    "sunset",
    "spring"
]

function getRandomInt() {
    const min = 0;
    const max = Math.floor(names.length);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const imgEl = document.querySelectorAll('img');

const arrOptionArgument = {
    name: names[getRandomInt()],
    page: 1,
    per_page: 9,
    category: 'all',
    colors: 'all',
    orientation: 'vertical',
    image_type: 'all',
};

searchImages(arrOptionArgument).then(({ hits }) => {
    return hits.map(({ webformatURL }, i) => imgEl[i].src = webformatURL)
})

