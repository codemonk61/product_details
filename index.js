

const carouselImages = document.querySelector('.carousel-images');
const thumbnails = document.querySelector('.thumbnails');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const addToCartButton = document.getElementById('addToCart');
const cartPopup = document.getElementById('cartPopup');
const closePopup = document.querySelector('.close-popup');
const bubble = document.querySelector('.bubble');
const navbar = document.querySelector('.navbar');
const sizePicker = document.querySelector('.size-picker');
const increment = document.querySelector('#increment');
const decrement = document.querySelector('#decrement');
const count = document.querySelector('#count');


const sizes = [
    {
        name: "4 GB",
        id: "qwerty123"
    },
    {
        name: "8 GB",
        id: "qwerty1238"
    },
    {
        name: "16 GB",
        id: "qwerty1234"
    },
    {
        name: "32 GB",
        id: "qwerty12345"
    },
    {
        name: "64 GB",
        id: "qwerty123456"
    }
]
let currentIndex = 0;
let sizeKey = "qwerty123"

const cachedCartCount = JSON.parse(localStorage.getItem("cartCount"))

let cartCount = cachedCartCount ? cachedCartCount : 0

bubble.innerHTML = cartCount;

const fetchData = async () => {
    
    const cachedData = JSON.parse(localStorage.getItem("images"))
  
    if (!cachedData) {
        const response = await fetch('https://picsum.photos/v2/list?page=1&limit=5');
        const data = await response.json();
        localStorage.setItem("images", JSON.stringify(data))
        loadImages(data);
    } else {
       loadImages(cachedData);
     
    }
}

let quantityCounter = 1;

increment.addEventListener('click', ()=> {
    count.innerText = ++quantityCounter;
})

decrement.addEventListener('click', ()=> {
    if(quantityCounter <= 1) return
    count.innerText = --quantityCounter;
})

const createSizesBox = () => {

    sizes.forEach((datum)=>{
        const sizeDiv = document.createElement('div');
        sizeDiv.innerHTML = `<p>${datum.name}</p>`;
        sizePicker.appendChild(sizeDiv)
        sizeKey = datum.id;

    })  
}

const loadImages = (images) => {
    images.forEach((image, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = image.download_url;
        imgElement.alt = `Product Image ${index + 1}`;
        carouselImages.appendChild(imgElement);

        const thumbnailElement = document.createElement('img');
        thumbnailElement.src = image.download_url;
        thumbnailElement.alt = `Thumbnail ${index + 1}`;
        thumbnailElement.dataset.index = index;

        thumbnailElement.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
        thumbnails.appendChild(thumbnailElement);
    });
    updateCarousel();
}


const updateCarousel = () => {
    const totalImages = carouselImages.children.length;
    const imageWidth = carouselImages.children[0].offsetWidth;
    carouselImages.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    const thumbnailElements = thumbnails.children;
    Array.from(thumbnailElements).forEach((thumb, index) => {
        if (index === currentIndex) {
            thumb.classList.add('active-thumbnail');
        } else {
            thumb.classList.remove('active-thumbnail');
        }
    });
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === totalImages - 1;
}





prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < carouselImages.children.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});


const showCartPopup = () => {
    cartPopup.style.display = 'block';
    setTimeout(() => {
        cartPopup.style.display = 'none';
    }, 4000);

    bubble.innerHTML =  ++cartCount;
    localStorage.setItem("cartCount",JSON.stringify(cartCount))
}



addToCartButton.addEventListener('click', showCartPopup);


closePopup.addEventListener('click', () => {
    cartPopup.style.display = 'none';
});

createSizesBox();
fetchData();
window.addEventListener('resize', updateCarousel);

