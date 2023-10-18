// FOR GETTING CURRENT TIME 

const currentDate = new Date() ;

let H = document.querySelector('.Hours') ;
let M = document.querySelector('.Minutes') ;
let PAM = document.querySelector('.am_pm') ;

H.innerHTML = currentDate.getHours() ;
M.innerHTML = currentDate.getMinutes() ;

function setPMAM(){
    if(currentDate.getHours() > 12){
        PAM.innerHTML = 'PM' ;
    }else {
        PAM.innerHTML = 'AM' ;
    }
}

setInterval(()=>{
    const currentDate = new Date() ;
    H.innerHTML = currentDate.getHours() ;
    M.innerHTML = currentDate.getMinutes() + 1;

    setPMAM() ;
},60000)

setPMAM();

// FOR SMOOTH SCROLLING
const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

// FOR MOUSE FOLLOWERS

function mouseFriendFunction() {

    window.addEventListener('mousemove', (details) => {

        // console.log(details.clientX, details.clientY) ;
        
        let mouseFollower = document.querySelector('.mouseFollower') ;
        
        mouseFollower.style.transform = `translate(${details.clientX}px, ${details.clientY}px)` ;

    }) ;
}

let timeout ;

function makeMoreAccurateMouseFollower() {

    let xMousePreviousPosition = 0 ; 
    let yMousePreviousPosition = 0 ;

    let xScale = 1 ;
    let yScale = 1 ;

    window.addEventListener('mousemove', (details) => {
        document.querySelector('.mouseFollower').style.display = 'inline' ;

        clearTimeout(timeout);

        let xDifference = (details.clientX - xMousePreviousPosition) ;
        let yDifference = (details.clientY - yMousePreviousPosition) ;

        xMousePreviousPosition = details.clientX ;
        yMousePreviousPosition = details.clientY ;
        
        // console.log(xDifference, yDifference) ;
        xScale = gsap.utils.clamp(.8,1.5,xDifference) ;
        yScale = gsap.utils.clamp(.8,1.5,yDifference) ;


        // console.log(xScale,yScale) ;
        changeScalling(xScale,yScale) ;

        timeout = setTimeout(() => {
            document.querySelector('.mouseFollower').style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1,1)` ;
        }, 100);
    }) ;

}


function changeScalling(xScalling, yScalling) {

    let mouseFollower = document.querySelector('.mouseFollower') ;
    window.addEventListener('mousemove', (details) => {
        mouseFollower.style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xScalling}, ${yScalling})` ;
    }) ;
}

makeMoreAccurateMouseFollower() ;
mouseFriendFunction() ;


// GSAP ANIMATION

let timeLine = gsap.timeline() ;

timeLine.from('.navigationBar', {
    y: -20,
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut ,
})

.to('.animationContent', {
    y: 0,
    duration: 2.2,
    delay: .1,
    ease: Expo.easeInOut,
    stagger: .2
})

// MAIN HIGH LIGHT OF THIS WEBSITE

let xPrevisouMouseImage = 0 ;
let yPreviousMouseImage = 0 ;
let timeOutForImage = undefined ;

document.querySelectorAll('.element').forEach((element) => {
    element.addEventListener('mousemove',(details) => {
        clearTimeout(timeOutForImage) ;

        let x = details.clientX - xPrevisouMouseImage ;
        xPrevisouMouseImage = details.clientX ;

        let angleX = (gsap.utils.clamp(-60,60,(x))) ;
        // let angleY = (gsap.utils.clamp(-20,20,(details.clientY - yPreviousMouseImage))) ;

        gsap.to(element.querySelector('.TheText'), {
            opacity: .3 ,
            duration: 2,
            ease: Power3 ,
            x: 20 ,
        })

        gsap.to(element.querySelector('img'), {
            opacity: 2 ,
            left: details.clientX  - (details.clientX * 40 / 100)  ,
            ease: Power3,
            rotate: angleX 
        })

        timeOutForImage = setTimeout(() => {
            gsap.to(element.querySelector('img'), {
                opacity: 2 ,
                left: details.clientX  - (details.clientX * 40 / 100)  ,
                ease: Power3,
                rotate: 0
            })
        }, 100);
    })
})


document.querySelectorAll('.element').forEach((element) => {
    element.addEventListener('mouseleave', (details) => {
        gsap.to(element.querySelector('img'), {
            opacity: 0 ,
        })

        gsap.to(element.querySelector('.TheText'), {
            opacity: .6 ,
            duration: 1,
            x: 0 
        })
    })
})

