// navidation on mobile mode
document.querySelector(".navigation").addEventListener("click", e =>
{
    const element = e.target.closest(".navigation__button");
    if(!element) return;
    document.querySelector(".navigation__list").classList.toggle("active");
});

// Slider
const slideWork = ()=>
{
    const slides = document.querySelectorAll(".slide");
    const btnLeft = document.querySelector(".slider__btn--left");
    const btnRight = document.querySelector(".slider__btn--right");

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
        effect();
    };
    const prevSlide = () =>
    {
        if(curSlide === 0) curSlide = maxSlides - 1;
        else curSlide--;
        goToSlide(curSlide);
        effect();
    };
    goToSlide(0);

    // Event handlers
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);

    // Keyboard right and left arrow
    document.addEventListener("keydown", (e)=>
    {
        if(e.key === "ArrowLeft") prevSlide();
        else if (e.key === "ArrowRight") nextSlide();
    });

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
slideWork();

