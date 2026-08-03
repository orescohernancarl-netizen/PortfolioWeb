/*=====================================
  DOM ELEMENTS
=====================================*/

const body = document.body;
const header = document.querySelector(".header");

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

const themeToggle = document.getElementById("theme-toggle");

const typing = document.getElementById("typing");

/*=====================================
  MOBILE MENU
=====================================*/

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navbar.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}

/*=====================================
  CLOSE MENU WHEN LINK IS CLICKED
=====================================*/

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});

/*=====================================
  DARK / LIGHT MODE
=====================================*/

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    body.classList.add("light-theme");

}

updateThemeIcon();

themeToggle.addEventListener("click", () => {

    body.classList.toggle("light-theme");

    if (body.classList.contains("light-theme")) {

        localStorage.setItem("theme", "light");

    } else {

        localStorage.setItem("theme", "dark");

    }

    updateThemeIcon();

});

function updateThemeIcon() {

    themeToggle.innerHTML = body.classList.contains("light-theme")
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

}

/*=====================================
  TYPING EFFECT
=====================================*/

const words = [

    "Front-End Developer",

    "Back-End Developer",

    "Full Stack Developer",

    "PHP Developer",

    "Python Developer",

    "Laravel Developer",

    "Flask Developer"

];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typing) return;

    const currentWord = words[wordIndex];

    if (!deleting) {

        typing.textContent = currentWord.substring(0, charIndex++);

        if (charIndex > currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;

        }

    } else {

        typing.textContent = currentWord.substring(0, charIndex--);

        if (charIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, deleting ? 45 : 90);

}

typeEffect();

/*=====================================
  SMOOTH SCROLL
=====================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});

/*=====================================
  ACTIVE NAVBAR
=====================================*/

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 140;
        const height = section.offsetHeight;

        if (window.scrollY >= top &&
            window.scrollY < top + height) {

            current = section.id;

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});
/*=====================================
  SCROLL REVEAL
=====================================*/

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {

    const revealPoint = 120;

    revealElements.forEach(element => {

        const windowHeight = window.innerHeight;

        const revealTop = element.getBoundingClientRect().top;

        if (revealTop < windowHeight - revealPoint) {

            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);

/*=====================================
  SCROLL TO TOP
=====================================*/

const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (!scrollBtn) return;

    scrollBtn.style.display =
        window.scrollY > 400 ? "flex" : "none";

});

if (scrollBtn) {

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*=====================================
  CONTACT FORM
=====================================*/

const contactForm =
document.getElementById("contact-form");

if(contactForm){

contactForm.addEventListener("submit",function(e){

e.preventDefault();

const inputs =
this.querySelectorAll("input, textarea");

let valid=true;

inputs.forEach(input=>{

if(input.value.trim()===""){

input.style.borderColor="#ff4d4d";

valid=false;

}else{

input.style.borderColor=
"rgba(255,255,255,.15)";

}

});

if(!valid){

alert("Please complete all fields.");

return;

}

const submitBtn =
this.querySelector("button");

submitBtn.disabled=true;

submitBtn.textContent="Sending...";

setTimeout(()=>{

alert("Message sent successfully!");

this.reset();

submitBtn.disabled=false;

submitBtn.textContent="Send Message";

},800);

});

}

/*=====================================
  HEADER SHADOW
=====================================*/

window.addEventListener("scroll",()=>{

if(window.scrollY>50){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}

});

/*=====================================
  AUTO COPYRIGHT YEAR
=====================================*/

const copyright =
document.querySelector(".copyright");

if(copyright){

copyright.innerHTML=
`© ${new Date().getFullYear()} Hernan Oresco. All Rights Reserved.`;

}

/*=====================================
  WINDOW RESIZE
=====================================*/

window.addEventListener("resize",()=>{

revealOnScroll();

});

/*=====================================
  REMOVE RIPPLE EFFECT
=====================================*/

/* Ripple intentionally removed.
It caused the Send Message button
to grow every click. */

/*=====================================
  PAGE LOADED
=====================================*/

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});
/*=====================================
  HERO 3D EFFECT
=====================================*/

const heroCard = document.querySelector(".profile-card");

if (heroCard) {

    document.addEventListener("mousemove", (e) => {

        const rect = heroCard.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 18;
        const rotateX = ((0.5 - y / rect.height)) * 18;

        heroCard.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    heroCard.addEventListener("mouseleave", () => {

        heroCard.style.transition = "0.4s ease";

        heroCard.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

    });

    heroCard.addEventListener("mouseenter", () => {

        heroCard.style.transition = "0s";

    });

}

/*=====================================
  CLOSE MOBILE MENU ON RESIZE
=====================================*/

window.addEventListener("resize", () => {

    if (window.innerWidth > 768 && navbar) {

        navbar.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});

/*=====================================
  ESC KEY CLOSE MENU
=====================================*/

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && navbar.classList.contains("active")) {

        navbar.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});

/*=====================================
  IMAGE FADE-IN
=====================================*/

window.addEventListener("load", () => {

    document.querySelectorAll("img").forEach(img => {

        img.style.opacity = "0";

        img.onload = () => {

            img.style.transition = ".6s ease";

            img.style.opacity = "1";

        };

        if (img.complete) {

            img.style.opacity = "1";

        }

    });

});

/*=====================================
  PREVENT DOUBLE FORM SUBMIT
=====================================*/

if (contactForm) {

    let sending = false;

    contactForm.addEventListener("submit", function (e) {

        if (sending) {

            e.preventDefault();

            return;

        }

        sending = true;

        setTimeout(() => {

            sending = false;

        }, 1200);

    });

}

/*=====================================
  PERFORMANCE
=====================================*/

window.addEventListener("scroll", () => {

    requestAnimationFrame(() => {

        revealOnScroll();

    });

});

/*=====================================
  END OF SCRIPT
=====================================*/

console.log(
"%cPortfolio Loaded Successfully 🚀",
"color:#06b6d4;font-size:16px;font-weight:bold;"
);