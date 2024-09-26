const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryNavContainer = document.querySelector('.gallery-nav');
let galleryNavItems = [];

class Carousel {
    constructor(container, items, controls) {
        this.CarouselContainer = container;
        this.CarouselControls = controls;
        this.CarouselArray = [...items];
        this.currentIndex = 1;
        this.setNav();
        this.updateGallery();
        this.addHoverButtons(); 
    }

    updateGallery() {
        this.CarouselArray.forEach((element, index) => {
            element.classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4');
            element.style.opacity = 0;
        });

        for (let i = 0; i < 4; i++) {
            const itemIndex = (this.currentIndex + i) % this.CarouselArray.length;
            const element = this.CarouselArray[itemIndex];
            element.classList.add(`gallery-item-${i + 1}`);
            element.style.opacity = (i === 2) ? 1 : 0.8;
        }

        this.updateNav();
        this.updateBackground();
    }

    addHoverButtons() {
        this.CarouselArray.forEach((item, index) => {
            const playButton = document.createElement('button');
            playButton.classList.add('gallery-button', 'gallery-button-play');
            playButton.innerHTML = `&#9658;`; 
            playButton.onclick = () => window.open('https://www.youtube.com', '_blank');
            item.appendChild(playButton);
    
            const linkButton = document.createElement('button');
            linkButton.classList.add('gallery-button', 'gallery-button-link');
            linkButton.innerHTML = `&#128279;`; 
            
            linkButton.onclick = () => window.open('https://www.example.com', '_blank');
            item.appendChild(linkButton);
        });
    }
    setCurrentState(direction) {
        if (direction.className === 'gallery-controls-previous') {
            this.currentIndex = (this.currentIndex === 0) ? this.CarouselArray.length - 1 : this.currentIndex - 1;
        } else {
            this.currentIndex = (this.currentIndex === this.CarouselArray.length - 1) ? 0 : this.currentIndex + 1;
        }
        this.updateGallery();
    }

    updateBackground() {
        const currentItem = this.CarouselContainer.querySelector('.gallery-item-3');
        const imageUrl = currentItem.getAttribute('src');
        const backgroundBlurDiv = document.querySelector('.background-blur');
        backgroundBlurDiv.style.backgroundImage = `url(${imageUrl})`;
    }

    setControls() {
        this.CarouselControls.forEach(control => {
            const button = document.createElement('button');
            button.className = `gallery-controls-${control}`;
            galleryControlsContainer.appendChild(button);
        });
    }

    useControls() {
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', event => {
                event.preventDefault();
                this.setCurrentState(control);
            });
        });
    }

    setNav() {
        this.CarouselArray.slice(0, 4).forEach(() => {
            const dot = document.createElement('li');
            galleryNavContainer.appendChild(dot);
            galleryNavItems.push(dot);
        });
        this.updateNav();
    }

    updateNav() {
        galleryNavItems.forEach(dot => dot.classList.remove('gallery-item-selected'));
        galleryNavItems[this.currentIndex].classList.add('gallery-item-selected');
    }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);
exampleCarousel.setControls();
exampleCarousel.useControls();
exampleCarousel.addHoverButtons(); 