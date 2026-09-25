
/* ========================================
   TUSHAR MONDAL - PORTFOLIO NAVIGATION
   File: js/navigation.js
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    initMobileNavigation();
    initActiveNavigation();
    initNavbarScroll();
});

/* ========================================
   1. MOBILE NAVIGATION MENU
======================================== */

function initMobileNavigation() {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );
    });

    // Close menu after clicking a navigation link
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove("menu-open");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove("menu-open");
        }
    });

    // Close menu when switching to desktop layout
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove("menu-open");
        }
    });
}

/* ========================================
   2. ACTIVE NAVIGATION LINK
======================================== */

function initActiveNavigation() {
    const navLinks = document.querySelectorAll(
        ".nav-links a"
    );

    if (!navLinks.length) return;

    const currentPage =
        window.location.pathname.split("/").pop() ||
        "index.html";

    navLinks.forEach((link) => {
        const linkPage =
            link.getAttribute("href")?.split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );
        } else {
            link.classList.remove("active");

            link.removeAttribute("aria-current");
        }
    });
}

/* ========================================
   3. NAVBAR SCROLL EFFECT
======================================== */

function initNavbarScroll() {
    const header = document.querySelector(".header");

    if (!header) return;

    function updateNavbar() {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();
}