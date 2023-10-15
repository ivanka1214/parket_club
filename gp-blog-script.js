
let answers = document.querySelectorAll(".accordion");
answers.forEach((event) => {
    let ques = event.querySelector(".accordion__question");
    event.addEventListener("click", function () {
        if (event.classList.contains("active")) {
            event.classList.remove("active");
            ques.classList.remove("accordion__question_active");
        } else {
            event.classList.add("active");
            ques.classList.add("accordion__question_active");
        }
    });
});
// Params

let tmr = 3000;
let mainSliderSelector = '.main-slider',
    navSliderSelector = '.nav-slider',
    interleaveOffset = 0.5;
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
// Main Slider
let mainSliderOptions = {
    loop: true,
    speed: 1000,
    autoplay: {
        delay: tmr,
        disableOnInteraction: false,
    },
    allowTouchMove:true,
    effect: 'fade',
    loopAdditionalSlides: 10,
    grabCursor: true,
    watchSlidesProgress: true,
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // },
    // pagination: {
    //     el: '.swiper-pagination',
    //     type: 'progressbar',
    // },
    on: {
        init: function () {
        },
        imagesReady: function () {
            this.el.classList.remove('loading');
            this.autoplay.start();
        },
        // slideChange: function() {
            
        //     let swiper = this;
        //     var previousSlide = swiper.previousIndex;
        //     console.log(previousSlide);
        //     // previousSlide.clearInterval(); 
        // },
        slideChangeTransitionStart: function () { 
           
            let count = 1;
            const interval = 3; 
            let swiper = this;
           
           
         
           
         const countInterval = setInterval(() => {
            swiper.on('slideChangeTransitionStart', function() {
                clearInterval(countInterval);   
            });
                count++;
               
                progressCircle.style.setProperty("--progress", count / 1000);

                progressContent.textContent = `3`;

                if (count > 350) {
                    progressContent.textContent = `2`;
                }
                if (count > 800) {
                    progressContent.textContent = `1`;
                }
                if (count > 1000) {
                    clearInterval(countInterval); 
                   
                }
                if (count > 1000) {
                    clearInterval(countInterval); 
                   
                }
                // var previousSlide = swiper.previousIndex;
                // console.log(swiper.previousIndex);
               

            }, interval);
            
        },

        setTransition: function (speed) {
            let swiper = this;
            for (let i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + "ms";
                swiper.slides[i].querySelector(".slide-bgimg").style.transition =
                    speed + "ms";

            }

        }
    }
};

let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);


// Navigation Slider
let navSliderOptions = {
    loop: true,
    loopAdditionalSlides: 10,
    speed: 1000,
    spaceBetween: 15,
    slidesPerView: 3,
    centeredSlides: true,
    touchRatio: 0.2,
    slideToClickedSlide: true,
    direction: 'vertical',
    on: {
        imagesReady: function () {
            this.el.classList.remove('loading');
        },
        click: function () {
        }
    }

};
let navSlider = new Swiper(navSliderSelector, navSliderOptions);

// Matching sliders
mainSlider.controller.control = navSlider;
navSlider.controller.control = mainSlider;


let category = document.querySelector(".news__category");
let hide = document.querySelector(".news__category-link_hide");
hide.addEventListener('click', function () {
    category.classList.toggle('news__category_open');
});
function toggleActive(event) {
    let target = event.target || event.srcElement;
    let buttonList = document.querySelectorAll(".news__category-link");
    buttonList.forEach(function (button) {
        if (button === target && !button.classList.contains("news__category-link_active")) {
            return button.classList.add("news__category-link_active");
        }
        return button.classList.remove("news__category-link_active");
    });
}






function Active(event) {
    let target = event.target || event.srcElement;
    let sectionsList = document.querySelectorAll(".news__section");

    //  let textList = sectionsList.querySelector("p.news__text");

    sectionsList.forEach(function (y) {
        textList = y.querySelector(".news__text");
        numberList = y.querySelector(".news__nubmer");
        if (y === target && !y.classList.contains("news__section_active")) {

            textList.classList.add("news__text_active");
            numberList.classList.add("news__nubmer_active");
            return y.classList.add("news__section_active");

            // textList.classList.add("news__text_active");
        }
        textList.classList.remove("news__text_active");
        numberList.classList.remove("news__nubmer_active");
        return y.classList.remove("news__section_active");


    });
}






let sort = document.querySelector('.sort');
let form_search = document.querySelector('.news__form_section');
sort.addEventListener('click', function () {
    sort.classList.toggle('sort_active');
    form_search.classList.toggle('news__form_section_active');
})









document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
    const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
    const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
    const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
    const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');


    // dropDownBtn.addEventListener('click', function (e) {
    //     this.classList.toggle('dropdown__button_active');
    // });


    // Клик по кнопке. Открыть/Закрыть select
    dropDownBtn.addEventListener('click', function (e) {
        dropDownList.classList.toggle('dropdown__list--visible');
        this.classList.add('dropdown__button--active');
    });

    // Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
    dropDownListItems.forEach(function (listItem) {
        listItem.addEventListener('click', function (e) {
            e.stopPropagation();
            dropDownBtn.innerText = this.innerText;
            dropDownBtn.focus();
            dropDownInput.value = this.dataset.value;
            dropDownList.classList.remove('dropdown__list--visible');
        });
    });

    // Клик снаружи дропдауна. Закрыть дропдаун
    document.addEventListener('click', function (e) {
        if (e.target !== dropDownBtn) {
            dropDownBtn.classList.remove('dropdown__button--active');
            dropDownList.classList.remove('dropdown__list--visible');
        }
    });

    // Нажатие на Tab или Escape. Закрыть дропдаун
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
            dropDownBtn.classList.remove('dropdown__button--active');
            dropDownList.classList.remove('dropdown__list--visible');
        }
    });
});

