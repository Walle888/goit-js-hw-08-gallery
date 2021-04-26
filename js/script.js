"use strict";

import gallery from './gallery-items.js'

const refs = {
    gallery: document.querySelector('.gallery'),
    modal: document.querySelector('.lightbox'),
    modalImg: document.querySelector('.lightbox__image'),
};

let activeIndex = null;


const markup = gallery.map(({original, preview, description}) => {
    return `<li class='gallery__item'><a class='gallery__link' href='${original}'><img class='gallery__image' data-source='${original}' src='${preview}' alt='${description}'></a></li>`
})

refs.gallery.insertAdjacentHTML('beforeend', markup.join(''));

refs.gallery.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        return
    }
    markup.forEach((el, index) => {
        if (el.includes(e.target.src)) {
            activeIndex = index;
            return;
        }
    });
    refs.modal.classList.add('is-open');
    refs.modalImg.src = e.target.dataset.source;
    refs.modalImg.alt = e.target.alt;
});

function closeModal() {
    refs.modal.classList.remove('is-open');
        refs.modalImg.src = '';
        refs.modalImg.alt = '';
}

refs.modal.addEventListener('click', e => {
    if (e.target.nodeName !== 'IMG') {
        closeModal();
    }
});

window.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

window.addEventListener('keyup', e => {
    if (e.key === 'ArrowRight' && gallery.length - 1 > activeIndex) {
        activeIndex += 1
        refs.modalImg.src = gallery[activeIndex].original;
        return;
    }

    if (e.key === 'ArrowLeft' && activeIndex > 0) {
        activeIndex -= 1
        refs.modalImg.src = gallery[activeIndex].original;
        return;
    }
    if (e.key === 'ArrowRight' && activeIndex === gallery.length - 1) {
        activeIndex = 0;
        refs.modalImg.src = gallery[activeIndex].original;
        return;
    }
    if (e.key === 'ArrowLeft' && activeIndex === 0) {
        activeIndex = gallery.length - 1;
        refs.modalImg.src = gallery[activeIndex].original;
        return;
}
});

