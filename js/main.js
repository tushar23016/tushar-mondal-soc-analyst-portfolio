
/* ========================================
   TUSHAR MONDAL - SOC ANALYST PORTFOLIO
   File: js/main.js
   Purpose: Main website initialization
======================================== */

"use strict";

/* ========================================
   1. MAIN APPLICATION
======================================== */

const MainApp = {
    loader: null,

    init() {
        this.loader = document.querySelector(
            "#loader, #preloader"
        );

        this.initializeWebsite();
    },

    /* ========================================
       2. INITIALIZE WEBSITE
    ======================================== */

    initializeWebsite() {
        this.setCurrentYear();
        this.initializeExternalLinks();
        this.initializeScrollBehavior();

        console.log("Portfolio initialized successfully.");
    },

    /* ========================================
       3. HIDE LOADING SCREEN
    ======================================== */

    hideLoader() {
        const loader = this.loader;

        if (!loader) return;

        loader.classList.add("loader-hidden");

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.pointerEvents = "none";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    },

    /* ========================================
       4. CURRENT YEAR
    ======================================== */

    setCurrentYear() {
        const yearElements = document.querySelectorAll(
            "#currentYear, #current-year, .current-year"
        );

        const currentYear = new Date().getFullYear();

        yearElements.forEach((element) => {
            element.textContent = currentYear;
        });
    },

    /* ========================================
       5. EXTERNAL LINKS
    ======================================== */

    initializeExternalLinks() {
        const links = document.querySelectorAll(
            'a[href^="http"]'
        );

        links.forEach((link) => {
            const currentHost = window.location.hostname;

            try {
                const linkHost = new URL(link.href).hostname;

                if (
                    linkHost !== currentHost &&
                    !link.hasAttribute("target")
                ) {
                    link.setAttribute("target", "_blank");

                    link.setAttribute(
                        "rel",
                        "noopener noreferrer"
                    );
                }
            } catch (error) {
                console.warn(
                    "Could not process external link:",
                    link.href
                );
            }
        });
    },

    /* ========================================
       6. SMOOTH SCROLLING
    ======================================== */

    initializeScrollBehavior() {
        const anchorLinks = document.querySelectorAll(
            'a[href^="#"]'
        );

        anchorLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#" ||
                    targetId.length < 2
                ) {
                    return;
                }

                const target = document.querySelector(
                    targetId
                );

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        });
    }
};

/* ========================================
   7. WEBSITE STARTUP
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {
        MainApp.init();
    }
);

/* ========================================
   8. REMOVE LOADER AFTER PAGE LOAD
======================================== */

window.addEventListener("load", () => {
    MainApp.hideLoader();
});

/* ========================================
   9. LOADER SAFETY FALLBACK
======================================== */

setTimeout(() => {
    if (!MainApp.loader) {
        MainApp.loader = document.querySelector(
            "#loader, #preloader"
        );
    }

    MainApp.hideLoader();
}, 4000);

/* ========================================
   10. ERROR HANDLING
======================================== */

window.addEventListener("error", (event) => {
    console.error(
        "Portfolio JavaScript error:",
        event.message
    );
});

/* ========================================
   11. UNHANDLED PROMISE ERRORS
======================================== */

window.addEventListener(
    "unhandledrejection",
    (event) => {
        console.error(
            "Portfolio asynchronous error:",
            event.reason
        );
    }
);