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

searchImages(names[getRandomInt()], 1, 9, "vertical").then(({ hits }) => {
    return hits.map(({ webformatURL }, i) => imgEl[i].src = webformatURL)
})

