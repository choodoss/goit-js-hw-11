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

searchImages(names[getRandomInt()], 1, 6, "vertical").then(({ hits }) => {
    const arrg = [0, 1, 2, 6, 7, 8]
    const photos = hits.map(({ webformatURL }, i) => {
        return imgEl[arrg[i]].src = webformatURL;
    })
    searchImages(names[getRandomInt()], 1, 3, "horizontal").then(({ hits }) => {
        const arrg = [3, 4, 5]
        const photos = hits.map(({ webformatURL }, i) => {
            return imgEl[arrg[i]].src = webformatURL;
        })
    })
})

