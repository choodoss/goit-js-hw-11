import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import axios, { isCancel, AxiosError } from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { searchImages, searchImagesFilterOrientation, searchImagesFilterСolors, searchImagesFilterType, searchImagesFilterCategory } from './SearchImages'
import { cardMacker } from './card';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const mainBackgrounEL = document.querySelector('.background-image');
const filterEl = document.querySelector('.filters');

let page = 1;
let hasMorePictures;
let name;
const options = {
    root: null,
    rootMargin: '200px',
    threshold: 1
}
let staticTotal = ''; // маркер для insertPicture, коли змінюється total, значить змінився запит, як що змінився запит потрібно використати в insertPicture innerHTML
let needFunction; // змінна для запису функції, при виборі фільтра, я зберігаю поточне посилання, щоб доповнити посилання фільтром
let gallery; // для запису SimpleLightbox

const callbackObserv = function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target)
            console.log('callbackObserv: глядач вимкнуто')
            page += 1
            loaderEl.classList.remove('visualy-hidden')
            needFunction(name, page)
                .then(({ hits }) => {
                    galleryEl.insertAdjacentHTML('beforeend', cardMacker(hits))
                    loaderEl.classList.add('visualy-hidden')

                    if (hasMorePictures) {
                        observer.observe(document.querySelector('.photo-card:last-child'));
                        console.log('callbackObserv: я увімкнув глядача глядача')
                    }
                    gallery.refresh() // повторна ініціалізація SimpleLightbox
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
        needFunction = searchImages;
        needFunction(name, page)
            .then(({ hits, total }) => {
                if (staticTotal === '') {
                    staticTotal = total; // перший запис маркеру для insertPicture
                }
                if (hits.length === 0) {
                    searchFormEl.reset(); // перевірка даних із input
                    return Notify.failure(`Sorry, there are no images with name '${name}' matching your search query. Please try again.`);
                }
                searchFormEl.classList.add('js--search-form'); // анімація підйому сьорчу у гору.
                mainBackgrounEL.classList.add('is-hidden');// для зникнення бекграунду, точніше картинок на початковому меню
                insertPicture(hits, total);//
                Notify.success(`Hooray! We found ${total} images.`);
                loaderEl.classList.add('visualy-hidden');//ховаю динамічні 3 крапки лоадеру
                setTimeout(() => filterEl.classList.remove('is-hidden'), 1000)//я хотів щоб фільтри зявлясь не відразу а коли меню вже підніметься у верх сторінки, зробив спеціально через setTimeout, так як ця функія викличеться останньою, а проміси перед нею
                hasMorePictures = total > (40 * page);// перший підрахунок для observer
            })
            .catch((err) => {
                throw new Error(err);
            })
    }
}

searchFormEl.addEventListener('submit', hendleSearchImages);

function hendleSearchImagesByFilter(e) { // для вибору який фільтр був обраний і його значення + запуск необхідної функції
    page = 1; // так як був застосований фільтр, відлік знову має початись із 1 сторінки
    loaderEl.classList.remove('visualy-hidden');
    switch (e.target.name) {
        case 'image type':
            needFunction = searchImagesFilterType;
            needFunction(e.target.value, page).then(({ hits, total }) => {
                insertPicture(hits, total);
                Notify.success(`Hooray! We found ${total} images.`);
            })
                .catch((err) => {
                    throw new Error(err);
                })
            break;
        case 'category':
            needFunction = searchImagesFilterType;
            searchImagesFilterCategory(e.target.value, page).then(({ hits, total }) => {
                insertPicture(hits, total);
                Notify.success(`Hooray! We found ${total} images.`);
            })
                .catch((err) => {
                    throw new Error(err);
                })
            break;
        case 'colors':
            needFunction = searchImagesFilterType;
            searchImagesFilterСolors(e.target.value, page).then(({ hits, total }) => {
                insertPicture(hits, total);
                Notify.success(`Hooray! We found ${total} images.`);
            })
                .catch((err) => {
                    throw new Error(err);
                })
            break;
        case 'orientation':
            needFunction = searchImagesFilterType;
            searchImagesFilterOrientation(e.target.value, page).then(({ hits, total }) => {
                insertPicture(hits, total);
                Notify.success(`Hooray! We found ${total} images.`);
            })
                .catch((err) => {
                    throw new Error(err);
                })
            break;
    }
}

function insertPicture(hits, total) {
    hasMorePictures = page < Math.ceil(total / 40);// додатковий підрахунок hasMorePictures для observer
    const cardMarkup = cardMacker(hits);
    if (staticTotal !== total) { // спрацювання маркеру, як що пошук змінився (змінилася і кількість картинок), пнеобхідно перемалювати сторінку
        galleryEl.innerHTML = cardMarkup;
        window.scrollTo(0, 0); // так як це має бути першою сторінку піднімаю сторінку, картинок 40, щоб глядач не опинився на 24 наприклад
        loaderEl.classList.add('visualy-hidden');
        staticTotal = total;
    } else {
        galleryEl.insertAdjacentHTML('beforeend', cardMarkup);
        loaderEl.classList.add('visualy-hidden');
    }
    if (hasMorePictures) {
        console.log('insertPicture: я увімкнув глядача глядача')
        observer.observe(document.querySelector('.photo-card:last-child'));
    } else {
        Notify.info(`The pictures are gone(`);
    }
    gallery = new SimpleLightbox('.photo-card__link', {
        captions: true,
        captionDelay: 250,
        captionsData: 'alt',
        captionPosition: 'bottom',
    });
}
searchFormEl.addEventListener('input', hendleSearchImagesByFilter); // для фільтрів

