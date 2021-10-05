// document.querySelector(".js__href").classList.add("animate__bounce");
//document.querySelector(".js__href").classList.add("animate__animated");


// navidation on mobile mode
document.querySelector(".navigation").addEventListener("click", e =>
{
    const element = e.target.closest(".navigation__button");
    if(!element) return;
    document.querySelector(".navigation__list").classList.toggle("active");
});

// Slider
const slideWork = (className)=>
{
    const slides = document.querySelectorAll(`.${className}`);
    // const btnLeft = document.querySelector(".slider__btn--left");
    // const btnRight = document.querySelector(".slider__btn--right");

    let curSlide = 0;
    let maxSlides = slides.length;

    const goToSlide = (slide) =>
    {
        slides.forEach((sl, i) =>
        {
            sl.style.transform = `translateX(${100 * ( i - slide )}%)`;
        });
    };
    const nextSlide = () =>
    {
        if(curSlide === maxSlides - 1) curSlide = 0;
        else curSlide++;
        goToSlide(curSlide);
        if(className === "js__slide__testimonial") return; // don't apply the effect on the testimonial slider
        effect();
    };
    const prevSlide = () =>
    {
        if(curSlide === 0) curSlide = maxSlides - 1;
        else curSlide--;
        goToSlide(curSlide);
        if(className === "js__slide__testimonial") return; // don't apply the effect on the testimonial slider
        effect();
    };
    goToSlide(0);

    // Event handlers
    // btnRight.addEventListener("click", nextSlide);
    // btnLeft.addEventListener("click", prevSlide);

    slides.forEach(el => 
    {
        const left = el.parentElement.querySelector(".slider__btn--left");
        const right = el.parentElement.querySelector(".slider__btn--right");
        left.addEventListener("click", prevSlide);
        right.addEventListener("click", nextSlide);
    });



    // Keyboard right and left arrow
    // document.addEventListener("keydown", (e)=>
    // {
    //     if(e.key === "ArrowLeft") prevSlide();
    //     else if (e.key === "ArrowRight") nextSlide();
    // });

    const effect = ()=>
    {
        slides.forEach(e =>
        {
            if(e.style.transform === `translateX(0%)`)
            {
                // Effect (move left) when you move to slide 1
                if(e.classList.contains("slide--1") )
                {
                    // console.log(e);
                    // console.log(e.querySelector(".slider__typo"));
                    e.querySelector(".slider__typo").style.animation ="moveBottomToTop 2s"
                }
                else 
                {
                    document.querySelector(".slide--1").querySelector(".slider__typo").style.animation = "none";
                }

                // Effect (move left) when you move to slide 2
                if(e.classList.contains("slide--2") )
                {
                    e.querySelector(".slider__typo").style.animation ="moveRightToLeft 2s"
                }
                else 
                {
                    document.querySelector(".slide--2").querySelector(".slider__typo").style.animation = "none";
                }
                // Effect (move up) when you move to slide 3
                if(e.classList.contains("slide--3") )
                {
                    e.querySelector(".slider__typo").style.animation ="moveLeftToRight 2s"
                }
                else 
                {
                    document.querySelector(".slide--3").querySelector(".slider__typo").style.animation = "none";
                }
                // You can refactor these if-else statements by making a func and call it 3 time and pass className and the animatio ... but I won't do it now
            }
        })
    }
}
slideWork("js__slide__header");
slideWork("js__slide__testimonial");




// Skills line percentage 
const percentages = Array.from(document.querySelectorAll(".skills__perc"));
percentages.forEach(el =>
{
   const perc = el.textContent;
   //console.log(perc);
   el.parentElement.nextElementSibling.querySelector(".skills__progress").style.width = `${perc}`;
});


// choosing functionality (drop down paragraphs)
const drop = () =>
{
    const headers = Array.from(document.querySelectorAll(".choose__item--header"));
    headers.forEach(header =>
    {
        header.addEventListener("click", ()=>
        {
            // change plus to minus and visa verce
            const icons = header.querySelectorAll(".choose__item--header-icon");
            icons.forEach(icon =>
            {
                icon.classList.toggle("icon--active");
            });

            // change header background-color
            header.classList.toggle("header__background__color");
            console.log(header);

            // show the paragraph
            const paragraph = header.nextElementSibling;
            console.log(paragraph);
            paragraph.classList.toggle("show__paragraph");
        });
        
    });
}
drop();

// Counting numbers when you reach the section
const countNumbers = ()=>
{
    const numberContainers = Array.from(document.querySelectorAll(".number__item--number"));
    numberContainers.forEach(cont =>
    {
        let counter = 0, num = +cont.textContent;
        cont.textContent = "0";
        if(num > 300) counter = 300; // to facilitate counting big numbers
        const count = setInterval(()=>
        {
            counter++;
            cont.textContent = `${counter}`;
            if(counter >= num)
            {
                clearInterval(count);
                // console.log(counter)
            }
        }, 10);
    });
};
var waypoint = new Waypoint(
{
    element: document.querySelector(".section__numbers"),
    handler: function(direction) {
        if(direction === 'up') return;
        countNumbers();
        this.element.classList.add("animate__animated");
        this.element.classList.add(`animate__zoomIn`);
    },
    offset: "75%"
});
// countNumbers();


// Navigation smooth scrolling (when you click on a link in the navigation, go to it in a smooth way)

// the following code is not working properly cause we need an offset in the top of the section so that the header of the sections is shown properly

// document.querySelector(".navigation__list").addEventListener("click", e =>
// {
//     e.preventDefault();
//     // console.log(e.target.classList.contains("navigation__link"));
//     if(!e.target.classList.contains("navigation__link")) return;
//     const id = e.target.getAttribute("href");
//     // console.log(id);
//     document.querySelector(`${id}`).scrollIntoView({behavior: "smooth", block: "start"});
// });


document.querySelector(".navigation__list").addEventListener("click", e =>
{
    e.preventDefault();
    if(!e.target.classList.contains("navigation__link")) return;
    const id = e.target.getAttribute("href");
    const sectionCoords = document.querySelector(`${id}`).getBoundingClientRect();
    window.scrollTo(
    {
      left: sectionCoords.left + window.pageXOffset,
      top: sectionCoords.top + window.pageYOffset -45,
      behavior: 'smooth'
    }
  );
});



// animations when you reach a section
// http://imakewebthings.com/waypoints/guides/getting-started/
// https://animate.style/#usage


// header
// var waypoint = new Waypoint(
// {
//     element: document.querySelector('.slider'),
//     handler: function(direction) {
//         this.element.classList.add("animate__animated");
//         this.element.classList.add("animate__fadeIn");
//     }
// });

// // services
// var waypoint = new Waypoint(
// {
//     element: document.querySelector('.section__service'),
//     handler: function(direction) {
//         this.element.classList.add("animate__animated");
//         this.element.classList.add("animate__bounceInUp");
//     },
//     offset: '75%' // if you wanted to write a number in px ... just write it with no '' and without 'px'
// });

// Heading secondary
// document.querySelectorAll(".heading__secondary").forEach()

const waypointWithAnimation = function(el, animation)
{
    var waypoint = new Waypoint(
    {
        element: el,
        handler: function(direction) {
            this.element.classList.add("animate__animated");
            this.element.classList.add(`${animation}`);
        },
        offset: "75%"
    });
}
// header
document.querySelectorAll(".slider").forEach(el =>
{
    waypointWithAnimation(el, 'animate__fadeIn');
});

// heading secondary
document.querySelectorAll(".heading__secondary").forEach(el =>
{
    waypointWithAnimation(el, 'animate__fadeInDown');
});

// heading secondary paragraph
document.querySelectorAll(".heading__secondary--paragraph").forEach(el =>
{
    waypointWithAnimation(el, 'animate__fadeInUp');
});

// service item
document.querySelectorAll(".js__service--animation").forEach(el =>
{
    waypointWithAnimation(el, 'animate__fadeInUp');
});

// portfolio categoreis
document.querySelectorAll(".js__port--animation--left").forEach(el =>
{
    waypointWithAnimation(el, 'animate__fadeInLeft');
});
document.querySelectorAll(".js__port--animation--right").forEach(el =>
{
    waypointWithAnimation(el, 'animate__fadeInRight');
});

// in general .. fade left
document.querySelectorAll(".js--animation--left").forEach(el =>
{
    waypointWithAnimation(el, 'animate__fadeInLeft');
});
// in general .. fade right
document.querySelectorAll(".js--animation--right").forEach(el =>
{
    waypointWithAnimation(el, 'animate__fadeInRight');
});
// in general .. fade up
document.querySelectorAll(".js--animation--up").forEach(el =>
{
    waypointWithAnimation(el, 'animate__fadeInUp');
});
// in general .. zoom in
document.querySelectorAll(".js--animation--zoomin").forEach(el =>
{
    waypointWithAnimation(el, 'animate__zoomIn');
});