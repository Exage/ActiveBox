window.addEventListener('DOMContentLoaded', () => {
    const $wpadminbar = document.getElementById('wpadminbar')
    let $wpadminbarHeight = $wpadminbar ? $wpadminbar.clientHeight : 0
    /* Burger */

    const burger = document.querySelector('.burger')
    const burgerSpan = document.querySelector('.burger__span')
    const burgerMask = document.querySelector('.nav__mask')

    window.addEventListener('click', Event => {
        if (Event.target === burger || Event.target === burgerSpan) burgerOpen()

        if (Event.target.id === 'close-burger') burgerClose()
    })

    function burgerOpen() {
        burgerMask.classList.add('nav-active')
        document.body.classList.add('burger-open')
    }

    function burgerClose() {
        burgerMask.classList.remove('nav-active')
        document.body.classList.remove('burger-open')
    }

    /* Header */

    const header = document.querySelector('.header')
    const headerInner = document.querySelector('.header__inner')

    const headerHeight = header.clientHeight
    const headerInnerHeight = headerInner.clientHeight

    let introHeight = document.querySelector('.intro').clientHeight

    function headerToggle() {
        let scrollPos = window.scrollY

        if (scrollPos >= headerHeight) {
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
            header.classList.remove('trans')
        }

        if (scrollPos >= introHeight - headerInnerHeight) {
            header.classList.add('show')
            header.classList.add('trans')
        } else {
            header.classList.remove('show')
        }
    }

    headerToggle()

    window.addEventListener('scroll', () => {
        introHeight = document.querySelector('.intro').clientHeight
        headerToggle()
    })

    function setHeaderTopByWpadmin() {
        if (window.innerWidth >= 600) {
            $wpadminbarHeight = $wpadminbar ? $wpadminbar.clientHeight : 0    
            header.setAttribute('style', `top: ${$wpadminbarHeight}px`)
            console.log('111')
        } else {
            $wpadminbarHeight = 0  
            header.removeAttribute('style')
            console.log('222')
        }
    }

    setHeaderTopByWpadmin()

    window.addEventListener('resize', () => { setHeaderTopByWpadmin() })

    /* Smooth Scroll */

    const navLinks = Array.from(document.querySelectorAll('.nav__link'))

    navLinks.forEach(item => {
        item.addEventListener('click', Event => {
            Event.preventDefault()

            const target = document.querySelector(`${item.getAttribute('href')}`)

            burgerClose()

            window.scrollBy({
                top: target.getBoundingClientRect().top - headerInner.clientHeight - $wpadminbarHeight,
                behavior: "smooth"
            })
        })
    })

    /* Reviews */

    const reviewsButtons = document.querySelector('.review__buttons')
    const reviewItem = document.querySelector('.review__item')

    const reviewText = document.querySelectorAll('.review__text')
    const reviewImages = document.querySelectorAll('.review__photo img')

    let sliderCounter = 0

    for (let i = 0; i <= reviewText.length - 1; i++) {
        const dot = document.createElement('button')
        dot.classList.add('review__dot')

        reviewsButtons.insertAdjacentElement('beforeend', dot)
    }

    const reviewDots = document.querySelectorAll('.review__dot')

    reviewDots.forEach((item, itemPos) => {
        item.addEventListener('click', () => {
            sliderCounter = itemPos
            makeNotActiveRevElems()
            makeActiveRevElems(sliderCounter)
        })
    })

    function makeActiveRevElems(counter) {
        reviewDots[counter].classList.add('active')
        reviewImages[counter].classList.add('active')
        reviewText[counter].classList.add('active')
    }
    makeActiveRevElems(sliderCounter)

    function makeNotActiveRevElems() {
        reviewDots.forEach(item => {
            item.classList.remove('active')
        })
        reviewText.forEach(item => {
            item.classList.remove('active')
        })
        reviewImages.forEach(item => {
            item.classList.remove('active')
        })
    }

    function nextSlide() {
        (sliderCounter >= reviewText.length - 1) ? sliderCounter = 0 : sliderCounter++
        makeNotActiveRevElems()
        makeActiveRevElems(sliderCounter)
    }
    function prevSlide() {
        (sliderCounter <= 0) ? sliderCounter = reviewText.length - 1 : sliderCounter--
        makeNotActiveRevElems()
        makeActiveRevElems(sliderCounter)
    }

    let x = 0
    let xDiff = 0

    reviewItem.addEventListener('touchstart', Event => {
        x = Event.touches[0].clientX
    })

    reviewItem.addEventListener('touchmove', Event => {
        xDiff = x - Event.touches[0].clientX
    })

    reviewItem.addEventListener('touchend', Event => {
        if (xDiff >= 100) {
            nextSlide()
        }
        if (xDiff <= -100) {
            prevSlide()
        }
    })
})