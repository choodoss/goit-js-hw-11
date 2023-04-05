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

let hasMorePictures;
let name;
const options = {
    root: null,
    rootMargin: '200px',
    threshold: 1
}

let gallery = new SimpleLightbox('.photo-card__link', { // ініціалізую кожного разу (при першому завантаженні і при виборі фільтрів)
    captions: true,
    captionDelay: 250,
    captionsData: 'alt',
    captionPosition: 'bottom',
});
const arrOptionArgument = {
    name: '',
    page: 1,
    per_page: 40,
    category: 'all',
    colors: 'all',
    orientation: 'all',
    image_type: 'all',
};

const callbackObserv = function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target)
            console.log('observer - відписався на observer')
            arrOptionArgument.page += 1;
            loaderEl.classList.remove('visualy-hidden')
            searchImages(arrOptionArgument)
                .then(({ hits, total }) => {
                    insertPicture(hits, total); // додаваня розмітки + підписка
                    loaderEl.classList.add('visualy-hidden')
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
        arrOptionArgument.name = name;
        searchImages(arrOptionArgument)
            .then(({ hits, total }) => {
                if (hits.length === 0) {
                    searchFormEl.reset(); // перевірка даних із input
                    return Notify.failure(`Sorry, there are no images with name '${name}' matching your search query. Please try again.`);
                }
                searchFormEl.classList.add('js--search-form'); // анімація підйому сьорчу у гору.
                mainBackgrounEL.classList.add('is-hidden');// для зникнення бекграунду, точніше картинок на початковому меню
                hasMorePictures = total > (40 * arrOptionArgument.page);// перший підрахунок для observer
                insertPicture(hits, total);//вставка картинок + підписка на observer
                Notify.success(`Hooray! We found ${total} images.`);
                loaderEl.classList.add('visualy-hidden');//ховаю динамічні 3 крапки лоадеру
                setTimeout(() => filterEl.classList.remove('is-hidden'), 1000)//я хотів щоб фільтри зявлясь не відразу а коли меню вже підніметься у верх сторінки, зробив спеціально через setTimeout, так як ця функія викличеться останньою, а проміси перед нею
            })
            .catch((err) => {
                throw new Error(err);
            })
    }
}

searchFormEl.addEventListener('submit', hendleSearchImages);

function hendleSearchImagesByFilter(e) { //Функція для вибору який фільтр був обраний і його значення + запуск необхідної функції
    arrOptionArgument.page = 1;
    loaderEl.classList.remove('visualy-hidden');
    switch (e.target.name) {
        case 'category':
            arrOptionArgument.category = e.target.value;
            searchImages(arrOptionArgument)
                .then(({ hits, total }) => {
                    insertPicture(hits, total);
                    Notify.success(`Hooray! We found ${total} images.`);
                })
                .catch((err) => {
                    throw new Error(err);
                })
            break;
        case 'colors':
            arrOptionArgument.colors = e.target.value;
            searchImages(arrOptionArgument)
                .then(({ hits, total }) => {
                    insertPicture(hits, total);
                    Notify.success(`Hooray! We found ${total} images.`);
                })
                .catch((err) => {
                    throw new Error(err);
                })
            break;
        case 'orientation':
            arrOptionArgument.orientation = e.target.value;
            searchImages(arrOptionArgument).then(({ hits, total }) => {
                insertPicture(hits, total);
                Notify.success(`Hooray! We found ${total} images.`);
            })
                .catch((err) => {
                    throw new Error(err);
                })
            break;
        case 'image type':
            arrOptionArgument.image_type = e.target.value;
            searchImages(arrOptionArgument).then(({ hits, total }) => {
                insertPicture(hits, total);
                Notify.success(`Hooray! We found ${total} images.`);
            })
                .catch((err) => {
                    throw new Error(err);
                })
            break;
    }
}

function insertPicture(hits, total) { // функція додавання галереї працює при сабміті, виборі фільтрів і в обсеревері.
    hasMorePictures = arrOptionArgument.page < Math.ceil(total / 40);// додатковий підрахунок hasMorePictures для observer
    const cardMarkup = cardMacker(hits);
    if (arrOptionArgument.page === 1) { // спрацювання маркеру, як що пошук змінився (змінилася і кількість картинок), пнеобхідно перемалювати сторінку
        galleryEl.innerHTML = cardMarkup;
        window.scrollTo(0, 0); // так як це має бути першою сторінку піднімаю сторінку, картинок 40, щоб глядач не опинився на 24 наприклад
        loaderEl.classList.add('visualy-hidden');
    } else {
        galleryEl.insertAdjacentHTML('beforeend', cardMarkup);
        loaderEl.classList.add('visualy-hidden');
    }

    if (hasMorePictures) {
        observer.observe(document.querySelector('.photo-card:last-child'));// встановлення підписки
        console.log('insertPicture - підписався на observer')
    } else {
        Notify.info(`The pictures are gone(`);
    }

}

searchFormEl.addEventListener('input', hendleSearchImagesByFilter); // для фільтрів

