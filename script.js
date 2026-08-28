/*=====================================
  MOBILE MENU
=====================================*/

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");


function openMobileMenu() {

    if (!navbar || !menuBtn) return;

    navbar.classList.add("active");

    // Prevent the page behind the menu from scrolling
    document.body.classList.add("menu-open");

    const icon = menuBtn.querySelector("i");

    if (icon) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    }

    menuBtn.setAttribute("aria-expanded", "true");
}


function closeMobileMenu() {

    if (!navbar || !menuBtn) return;

    navbar.classList.remove("active");

    // Allow page scrolling again
    document.body.classList.remove("menu-open");

    const icon = menuBtn.querySelector("i");

    if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

    menuBtn.setAttribute("aria-expanded", "false");
}


function toggleMobileMenu() {

    if (!navbar) return;

    if (navbar.classList.contains("active")) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }

}


if (menuBtn && navbar) {

    menuBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        toggleMobileMenu();

    });

}


/*=====================================
  CLOSE MENU WHEN NAV LINK IS CLICKED
=====================================*/

if (navbar) {

    navbar.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            closeMobileMenu();

        });

    });

}


/*=====================================
  CLOSE MENU WHEN CLICKING OUTSIDE
=====================================*/

document.addEventListener("click", (e) => {

    if (!navbar || !menuBtn) return;

    const clickedInsideNavbar =
        navbar.contains(e.target);

    const clickedMenuButton =
        menuBtn.contains(e.target);

    if (
        navbar.classList.contains("active") &&
        !clickedInsideNavbar &&
        !clickedMenuButton
    ) {

        closeMobileMenu();

    }

});


/*=====================================
  CLOSE MENU WITH ESCAPE
=====================================*/

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        closeMobileMenu();

    }

});


/*=====================================
  THEME TOGGLE
=====================================*/

const themeBtn =
    document.getElementById("theme-toggle");

const body =
    document.body;


/* Get saved theme */

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "light") {

    body.classList.add("light-theme");

} else {

    body.classList.remove("light-theme");

}


/*=====================================
  UPDATE THEME ICON
=====================================*/

function updateThemeIcon() {

    if (!themeBtn) return;

    if (
        body.classList.contains("light-theme")
    ) {

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

        themeBtn.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    } else {

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

        themeBtn.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    }

}


updateThemeIcon();


/*=====================================
  TOGGLE THEME
=====================================*/

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        body.classList.toggle("light-theme");

        if (
            body.classList.contains("light-theme")
        ) {

            localStorage.setItem(
                "theme",
                "light"
            );

        } else {

            localStorage.setItem(
                "theme",
                "dark"
            );

        }

        updateThemeIcon();

    });

}


/*=====================================
  TYPING EFFECT
=====================================*/

const words = [

    "Front-End Developer",
    "Back-End Developer",
    "BSIT Student"

];


const typing =
    document.getElementById("typing");


let wordIndex = 0;
let charIndex = 0;
let deleting = false;


if (typing) {

    function typeEffect() {

        const current =
            words[wordIndex];


        if (!deleting) {

            typing.textContent =
                current.substring(
                    0,
                    charIndex++
                );


            if (
                charIndex >
                current.length
            ) {

                deleting = true;

                setTimeout(
                    typeEffect,
                    1500
                );

                return;

            }

        } else {

            typing.textContent =
                current.substring(
                    0,
                    charIndex--
                );


            if (charIndex < 0) {

                deleting = false;

                wordIndex++;

                if (
                    wordIndex >=
                    words.length
                ) {

                    wordIndex = 0;

                }

            }

        }


        setTimeout(
            typeEffect,
            deleting ? 60 : 100
        );

    }


    typeEffect();

}


/*=====================================
  SMOOTH SCROLL
=====================================*/

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener("click", function(e) {

            const href = this.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            const target = document.querySelector(href);

            if (!target) {
                return;
            }

            e.preventDefault();

            // Close mobile menu
            closeMobileMenu();



            const header =
                document.querySelector(".header");

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


/*=====================================
  ACTIVE NAVIGATION
=====================================*/

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".navbar a");


function activeNavigation() {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
                sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    activeNavigation,
    { passive: true }
);


activeNavigation();


/*=====================================
  SCROLL REVEAL ANIMATION
=====================================*/

const revealElements =
    document.querySelectorAll(".reveal");


function revealOnScroll() {

    const windowHeight =
        window.innerHeight;


    revealElements.forEach(element => {

        const revealTop =
            element.getBoundingClientRect().top;


        const revealPoint = 120;


        if (
            revealTop <
            windowHeight - revealPoint
        ) {

            element.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    revealOnScroll,
    { passive: true }
);


window.addEventListener(
    "load",
    revealOnScroll
);


/*=====================================
  SCROLL TO TOP BUTTON
=====================================*/

const scrollBtn =
    document.getElementById("scrollTop");


if (scrollBtn) {

    function updateScrollButton() {

        if (window.scrollY > 400) {

            scrollBtn.style.display =
                "flex";

        } else {

            scrollBtn.style.display =
                "none";

        }

    }


    window.addEventListener(
        "scroll",
        updateScrollButton,
        { passive: true }
    );


    scrollBtn.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        }
    );


    updateScrollButton();

}


/*=====================================
  CONTACT FORM
=====================================*/

const contactForm =
    document.getElementById(
        "contact-form"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(e) {

            e.preventDefault();


            const inputs =
                this.querySelectorAll(
                    "input, textarea"
                );


            let valid = true;


            inputs.forEach(input => {

                if (
                    input.value.trim() === ""
                ) {

                    input.style.borderColor =
                        "#ef4444";

                    valid = false;

                } else {

                    input.style.borderColor =
                        "";

                }

            });


            if (!valid) {

                return;

            }


            this.reset();


            if (
                document.activeElement &&
                typeof document.activeElement.blur ===
                    "function"
            ) {

                document.activeElement.blur();

            }


            console.log(
                "Message sent successfully!"
            );

        }
    );

}


/*=====================================
  HEADER SHADOW
=====================================*/

const header =
    document.querySelector(".header");


if (header) {

    function updateHeader() {

        if (window.scrollY > 60) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();

}


/*=====================================
  HERO PARALLAX
=====================================*/

const profileCard =
    document.querySelector(
        ".profile-card"
    );




if (
    profileCard &&
    window.matchMedia(
        "(hover: hover)"
    ).matches
) {

    window.addEventListener(
        "mousemove",
        (e) => {

            const x =
                (
                    window.innerWidth / 2 -
                    e.clientX
                ) / 40;


            const y =
                (
                    window.innerHeight / 2 -
                    e.clientY
                ) / 40;


            profileCard.style.transform =
                `rotateY(${x}deg) rotateX(${-y}deg)`;

        }
    );


    window.addEventListener(
        "mouseleave",
        () => {

            profileCard.style.transform =
                "rotateY(0deg) rotateX(0deg)";

        }
    );

}


/*=====================================
  AUTO UPDATE COPYRIGHT YEAR
=====================================*/

const copyright =
    document.querySelector(
        ".copyright"
    );


if (copyright) {

    copyright.innerHTML =
        `© ${new Date().getFullYear()} Hernan Oresco. All Rights Reserved.`;

}


/*=====================================
  PAGE LOADED
=====================================*/

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);


/*=====================================
  WINDOW RESIZE
=====================================*/

window.addEventListener(
    "resize",
    () => {

        revealOnScroll();
        activeNavigation();


        /*
          If screen becomes desktop,
          automatically close mobile menu.
        */

        if (
            window.innerWidth > 768
        ) {

            closeMobileMenu();

        }

    }
);


/*=====================================
  PREVENT MOBILE MENU BACKGROUND SCROLL
=====================================*/

window.addEventListener(
    "touchmove",
    (e) => {

        if (
            document.body.classList.contains(
                "menu-open"
            )
        ) {

            /*
              Allow scrolling inside the navbar
              only if needed, but prevent the
              background page from moving.
            */

            if (
                navbar &&
                navbar.contains(e.target)
            ) {

                return;

            }

            e.preventDefault();

        }

    },
    { passive: false }
);