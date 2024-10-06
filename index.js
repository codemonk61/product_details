

    const carouselImages = document.querySelector('.carousel-images');
    const thumbnails = document.querySelector('.thumbnails');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const addToCartButton = document.getElementById('addToCart');
    const cartPopup = document.getElementById('cartPopup');
    const closePopup = document.querySelector('.close-popup');

    let currentIndex = 0;

    const fetchData = async () =>{
        const response = await fetch('https://picsum.photos/v2/list?page=1&limit=5');
        const data = await response.json();
        loadImages(data);
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
    }

    addToCartButton.addEventListener('click', showCartPopup);


    closePopup.addEventListener('click', () => {
        cartPopup.style.display = 'none';
    });

  
    fetchData();

    window.addEventListener('resize', updateCarousel);

