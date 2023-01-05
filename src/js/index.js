import { fetchImages } from '../js/fetchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search-form-input');
const btnSearch = document.querySelector('.search-form-button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

class Style {
  none; 
  block;
  constructor() { 
    this.none = "none";
    this.block = "block";
  }

}

btnLoadMore.style.display = new Style().none;

let pageNumber = 1;

btnSearch.addEventListener('click', onSerchClick);

function onSerchClick(e){
  e.preventDefault();
  cleanGallery();
  const trimmedValue = input.value.trim();
  if (trimmedValue !== '') {
    fetchImages(trimmedValue, pageNumber).then(foundData => {
      renderImageList(foundData.hits);
      Notiflix.Notify.success(
        `Hooray! We found ${foundData.totalHits} images.`
      );
      btnLoadMore.style.display = new Style().block;
      gallerySimpleLightbox.refresh();
    }).catch(error => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
  }
  }
  

btnLoadMore.addEventListener('click', onLoadMoreClick);


function onLoadMoreClick(e){
  pageNumber++;
  const trimmedValue = input.value.trim();
  btnLoadMore.style.display = new Style().none;
  fetchImages(trimmedValue, pageNumber).then(foundData => {
    renderImageList(foundData.hits);
    gallerySimpleLightbox.refresh();
    Notiflix.Notify.success(
      `Hooray! We found ${foundData.totalHits} images.`
    );
    btnLoadMore.style.display = new Style().block;
  }).catch(error => { 
    Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  )});
  
}
function renderImageList(images) {
  console.log(images, 'images');
  const markup = images
    .map(image => {
      console.log('img', image);
      return `<div class="photo-card">

       <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/></a>

        <div class="info">
           <p class="info-item">
    <b>Likes</b> <span class="info-item-api"> ${image.likes} </span>
</p>
            <p class="info-item">
                <b>Views</b> <span class="info-item-api">${image.views}</span>  
            </p>
            <p class="info-item">
                <b>Comments</b> <span class="info-item-api">${image.comments}</span>  
            </p>
            <p class="info-item">
                <b>Downloads</b> <span class="info-item-api">${image.downloads}</span> 
            </p>
        </div>
    </div>`;
    })
    .join('');
  gallery.innerHTML += markup;

  // const markup = images
  // .map(image => {
  //   const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image
  //   return `
  //     <a class="gallery__link" href="${largeImageURL}">
  //       <div class="gallery-item" id="${id}">
  //         <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
  //         <div class="info">
  //           <p class="info-item"><b>Likes</b>${likes}</p>
  //           <p class="info-item"><b>Views</b>${views}</p>
  //           <p class="info-item"><b>Comments</b>${comments}</p>
  //           <p class="info-item"><b>Downloads</b>${downloads}</p>
  //         </div>
  //       </div>
  //     </a>
  //   `
  // })
  // .join('')

  // gallery.insertAdjacentHTML('beforeend', markup)
}

function cleanGallery() {
  gallery.innerHTML = '';
  pageNumber = 1;
  btnLoadMore.style.display = new Style().none;
}
