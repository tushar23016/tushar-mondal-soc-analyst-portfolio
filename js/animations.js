
/* ========================================
   TUSHAR MONDAL - PORTFOLIO ANIMATIONS
   File: js/animations.js
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
    initSkillBars();
    initBackToTop();
});

/* ========================================
   1. SCROLL REVEAL ANIMATIONS
======================================== */

function initScrollAnimations() {
    const elements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-up"
    );

    if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => {
            element.classList.add("active");
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    elements.forEach((element) => {
        observer.observe(element);
    });
}

/* ========================================
   2. SKILL BAR ANIMATIONS
======================================== */

function initSkillBars() {
    const skillBars = document.querySelectorAll(
        ".skill-progress, .skill-bar-fill"
    );

    if (!("IntersectionObserver" in window)) {
        skillBars.forEach((bar) => {
            bar.style.width =
                bar.dataset.progress ||
                bar.dataset.level ||
                "0%";
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const bar = entry.target;

                    const progress =
                        bar.dataset.progress ||
                        bar.dataset.level ||
                        "0%";

                    bar.style.width = progress;

                    observerInstance.unobserve(bar);
                }
            });
        },
        {
            threshold: 0.3
        }
    );

    skillBars.forEach((bar) => {
        observer.observe(bar);
    });
}

/* ========================================
   3. BACK TO TOP BUTTON
======================================== */

function initBackToTop() {
    const backToTop = document.querySelector(
        "#backToTop, .back-to-top"
    );

    if (!backToTop) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    });

    backToTop.addEventListener("click", (event) => {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}