// function onClickMenu() {
//     document.getElementById("menu").classList.toggle("icon");
//     document.getElementById("nav").classList.toggle("change");

// }

// function closeNav() {
//     document.getElementById("mySideNav").style.width = "0";
//     document.getElementById("main").style.marginLeft = "0";
//     document.body.style.backgroundColor = "white";
// }

function onClickMenu() {
    var menu = document.getElementById("menu");
    var nav = document.getElementById("nav");
    var overlay = document.getElementById("Nav-overlay");

    menu.classList.toggle("icon");
    nav.classList.toggle("change");

    if (nav.classList.contains("change")) {
        document.getElementById("mySideNav").style.width = "250px";
        overlay.style.display = "block";
        
    } else {
        overlay.style.display = "none";
        document.getElementById("mySideNav").style.width = "0";
    }
}

function closeNav() {
    document.getElementById("menu").classList.remove("icon");
    document.getElementById("nav").classList.remove("change");
    document.getElementById("mySideNav").style.width = "0";
    document.getElementById("Nav-overlay").style.display = "none";
}

document.addEventListener('click', function(event) {
    var nav = document.getElementById('nav');
    var menu = document.getElementById('menu');
    var overlay = document.getElementById('Nav-overlay');
    var isClickInsideNav = nav.contains(event.target);
    var isClickInsideMenu = menu.contains(event.target);

    if (!isClickInsideNav && !isClickInsideMenu && overlay.style.display === 'block') {
        closeNav();
    }
});





// The above code is for the search icon 
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search-input');
const closeIcon = document.getElementById('close-icon');

function onClickSearch() {
    
   // const relatedSearchesContainer = document.getElementById('related-searches');

    document.getElementById('search-icon').addEventListener('click',()=> {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });

    closeIcon.addEventListener('click', closeSearchOverlay);

    searchOverlay.addEventListener('click',(event) =>{
        if (event.target === searchOverlay){
            closeSearchOverlay();
        }
    });

    searchInput.addEventListener('input', ()=> {
        const query = searchInput.value.toLowerCase();
        showRelatedSearches(query);
    });
}

function closeSearchOverlay() {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
}


// The above code is for the login and signup side nav

function openLogin() {
    document.getElementById("sideLoginNav").style.width = "400px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeLogin() {
    document.getElementById("sideLoginNav").style.width = "0";
    document.body.style.backgroundColor = "white";
}

function toggleForm(formId) {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    if (formId === 'signupForm') {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    } else {
        signupForm.style.display = "none";
        loginForm.style.display = "block";
    }
}


// cards
document.addEventListener('DOMContentLoaded', () => {
    const cardIds = [
        'interactive-card1', 'interactive-card2', 'interactive-card3', 'interactive-card4',
        'interactive-card5', 'interactive-card6', 'interactive-card7', 'interactive-card8'
    ];

    cardIds.forEach(cardId => {
        const card = document.getElementById(cardId);
        const images = card.querySelectorAll('.card-image');
        const defaultImage = card.querySelector(`#default${cardId.slice(-1)}`);

        card.addEventListener('mousemove', (e) => {
            const cardWidth = card.clientWidth;
            const mouseX = e.offsetX;

            // Calculate which image to show based on the mouse position
            let index = Math.floor(mouseX / cardWidth * (images.length - 1));
            if (index >= images.length - 1) index = images.length - 2;

            images.forEach((img, i) => {
                img.classList.toggle('active', i === index + 1);
            });
        });

        card.addEventListener('mouseleave', () => {
            // Reset to default image when mouse leaves the card
            images.forEach(img => img.classList.remove('active'));
            defaultImage.classList.add('active');
        });

        card.addEventListener('mouseenter', () => {
            // Remove default image when mouse enters the card
            defaultImage.classList.remove('active');
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    function isMobileView() {
        return window.innerWidth <= 600;
    }

    function applyDesktopBehavior() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseover', function() {
                const images = card.querySelectorAll('img');
                images.forEach(img => img.classList.remove('active'));
                if (images.length > 0) {
                    images[0].classList.add('active');
                }
            });

            card.addEventListener('mouseout', function() {
                const images = card.querySelectorAll('img');
                images.forEach(img => img.classList.remove('active'));
                const defaultImage = card.querySelector('img');
                if (defaultImage) {
                    defaultImage.classList.add('active');
                }
            });
        });
    }

    function applyMobileBehavior() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            let touchstartX = 0;
            let touchendX = 0;

            card.addEventListener('touchstart', function(event) {
                touchstartX = event.changedTouches[0].screenX;
            });

            card.addEventListener('touchend', function(event) {
                touchendX = event.changedTouches[0].screenX;
                handleSwipe(card);
            });

            function handleSwipe(card) {
                const images = card.querySelectorAll('img');
                const activeImage = Array.from(images).findIndex(img => img.classList.contains('active'));
                if (activeImage !== -1) {
                    images[activeImage].classList.remove('active');
                    if (touchendX < touchstartX) {
                        // Swiped left
                        images[(activeImage + 1) % images.length].classList.add('active');
                    } else if (touchendX > touchstartX) {
                        // Swiped right
                        images[(activeImage - 1 + images.length) % images.length].classList.add('active');
                    }
                    // Add glow effect
                    card.classList.add('glow');
                    setTimeout(() => {
                        card.classList.remove('glow');
                    }, 300); // Remove glow effect after 0.3s
                }
            }

            // Set the first image as active
            const images = card.querySelectorAll('img');
            if (images.length > 0) {
                images[0].classList.add('active');
            }
        });
    }

    function adjustBehavior() {
        if (isMobileView()) {
            applyMobileBehavior();
        } else {
            applyDesktopBehavior();
        }
    }

    window.addEventListener('resize', adjustBehavior);
    adjustBehavior(); // Initial call
});
