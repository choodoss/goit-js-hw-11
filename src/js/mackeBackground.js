import { searchImages } from './SearchImages'

const names = ['cat', 'dog', 'popular', 'fun', 'ukraine', 'lions', 'girls', 'horses', 'nature', 'space']

function getRandomInt() {
    min = 0;
    max = Math.floor(names.length);
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

