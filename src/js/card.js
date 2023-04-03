
export function cardMacker(arr) {
    return arr.map(item => {
        return `<div class="photo-card">
    <img class="photo-card__img" src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
    <div class="info">
        <p class="info-item">
            <sapn class="info-item__name">Likes</sapn>
            <sapn class="info-item__description">${item.likes}</sapn>
        </p>
        <p class="info-item">
            <sapn class="info-item__name">Views</sapn>
            <sapn class="info-item__description">${item.views}</sapn>
        </p>
        <p class="info-item">
            <sapn class="info-item__name">Comments</sapn>
            <sapn class="info-item__description">${item.comments}</sapn>
        </p>
        <p class="info-item">
            <sapn class="info-item__name">Downloads</sapn>
            <sapn class="info-item__description">${item.downloads}</sapn>
        </p>
    </div>
</div>`
    }
    ).join('')
}