
// export function cardMacker(arr) {
//     return arr.map(item => {
//         return `<div class="photo-card">
//     <img class="photo-card__img" src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
//     <div class="info">
//         <p class="info-item">
//             <sapn class="info-item__name">Likes</sapn>
//             <sapn class="info-item__description">${item.likes}</sapn>
//         </p>
//         <p class="info-item">
//             <sapn class="info-item__name">Views</sapn>
//             <sapn class="info-item__description">${item.views}</sapn>
//         </p>
//         <p class="info-item">
//             <sapn class="info-item__name">Comments</sapn>
//             <sapn class="info-item__description">${item.comments}</sapn>
//         </p>
//         <p class="info-item">
//             <sapn class="info-item__name">Downloads</sapn>
//             <sapn class="info-item__description">${item.downloads}</sapn>
//         </p>
//     </div>
// </div>`
//     }
//     ).join('')
// }


export function cardMacker(arr) {
    return arr.map(item => {
        return `<div class="photo-card">
        <a class="photo-card__link" href="${item.largeImageURL}"><img class="photo-card__img" src="${item.webformatURL}" alt="${item.tags}" loading="lazy" /></a>
    <div class="info">
        <p class="info-item">
            <span class="info-item__name">Likes</span>
            <span class="info-item__description">${item.likes}</span>
        </p>
        <p class="info-item">
            <span class="info-item__name">Views</span>
            <span class="info-item__description">${item.views}</span>
        </p>
        <p class="info-item">
            <span class="info-item__name">Comments</span>
            <span class="info-item__description">${item.comments}</span>
        </p>
        <p class="info-item">
            <span class="info-item__name">Downloads</span>
            <span class="info-item__description">${item.downloads}</span>
        </p>
    </div>
</div>`
    }
    ).join('')
}