import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import axios, { isCancel, AxiosError } from 'axios';

import { searchImages, searchImagesFilterOrientation, searchImagesFilterСolors, searchImagesFilterType, searchImagesFilterCategory } from './SearchImages'
import { cardMacker } from './card';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const mainBackgrounEL = document.querySelector('.background-image');
const filterEl = document.querySelector('.filters');

let page = 1;
let needMorePicture;
let name;
const options = {
    root: null,
    rootMargin: '200px',
    threshold: 1
}
let staticTotal = '';
let needFunction;

const callbackObserv = function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target)
            page += 1
            loaderEl.classList.remove('visualy-hidden')
            needFunction(name, page)
                .then(({ hits }) => {
                    galleryEl.insertAdjacentHTML('beforeend', cardMacker(hits))
                    loaderEl.classList.add('visualy-hidden')
                    if (needMorePicture) {
                        const target = document.querySelector('.photo-card:last-child');
                        observer.observe(target);
                    }
                });
        }
    });
};

const observer = new IntersectionObserver(callbackObserv, options);

function hendleSearchImages(e) {
    e.preventDefault();
    name = e.target.elements.searchQuery.value.trim();
    if (name === '') {
        return Notify.failure('Enter the search request');
    } else {
        loaderEl.classList.remove('visualy-hidden');
        searchFormEl.classList.add('js--search-form');
        mainBackgrounEL.classList.add('is-hidden');
        needFunction = searchImages;
        needFunction(name, page)
            .then(({ hits, total }) => {
                staticTotal = total;
                if (hits.length === 0) {
                    searchFormEl.reset();
                    return Notify.failure(`Sorry, there are no images with name '${name}' matching your search query. Please try again.`);
                }
                galleryEl.insertAdjacentHTML('beforeend', cardMacker(hits));
                loaderEl.classList.add('visualy-hidden');
                filterEl.classList.remove('is-hidden');
                needMorePicture = total > (40 * page);
                if (needMorePicture) {
                    const target = document.querySelector('.photo-card:last-child');
                    observer.observe(target);
                }
            })
            .catch((err) => {
                throw new Error(err);
            })
    }

}

searchFormEl.addEventListener('submit', hendleSearchImages);

function hendleSearchImagesByFilter(e) {
    loaderEl.classList.remove('visualy-hidden');
    switch (e.target.name) {
        case 'image type':
            needFunction = searchImagesFilterType;
            needFunction(e.target.value, page).then(({ hits, total }) => {
                insertPicture(hits, total);
            })
                .catch((err) => {
                    throw new Error(err);
                })
            break;
        case 'category':
            needFunction = searchImagesFilterType;
            searchImagesFilterCategory(e.target.value, page).then(({ hits, total }) => {
                insertPicture(hits, total);
            })
                .catch((err) => {
                    throw new Error(err);
                })
            break;
        case 'colors':
            needFunction = searchImagesFilterType;
            searchImagesFilterСolors(e.target.value, page).then(({ hits, total }) => {
                insertPicture(hits, total);
            })
                .catch((err) => {
                    throw new Error(err);
                })
            break;
        case 'orientation':
            needFunction = searchImagesFilterType;
            searchImagesFilterOrientation(e.target.value, page).then(({ hits, total }) => {
                insertPicture(hits, total);
            })
                .catch((err) => {
                    throw new Error(err);
                })
            break;
    }
}

function insertPicture(hits, total) {
    const hasMorePictures = page < Math.ceil(total / 40);
    const cardMarkup = cardMacker(hits);

    if (staticTotal !== total) {
        galleryEl.innerHTML = cardMarkup;
        page
        loaderEl.classList.add('visualy-hidden');
        if (hasMorePictures) {
            observer.observe(document.querySelector('.photo-card:last-child'));
        }
    } else {
        galleryEl.insertAdjacentHTML('beforeend', cardMarkup);
        loaderEl.classList.add('visualy-hidden');
        if (hasMorePictures) {
            observer.observe(document.querySelector('.photo-card:last-child'));
        } else {
            Notify.failure(`The pictures are gone(`);
        }
    }
}
searchFormEl.addEventListener('input', hendleSearchImagesByFilter);

