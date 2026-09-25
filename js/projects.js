
/* ========================================
   TUSHAR MONDAL - PORTFOLIO PROJECTS
   File: js/projects.js
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    initProjectFilter();
    initProjectCards();
});

/* ========================================
   1. PROJECT FILTER
======================================== */

function initProjectFilter() {
    const filterButtons = document.querySelectorAll(
        ".filter-btn, .project-filter"
    );

    const projectCards = document.querySelectorAll(
        ".project-card"
    );

    if (!filterButtons.length || !projectCards.length) {
        return;
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category =
                button.dataset.filter ||
                button.dataset.category ||
                "all";

            // Update active filter button
            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            // Filter project cards
            projectCards.forEach((card) => {
                const cardCategory =
                    card.dataset.category || "all";

                const shouldShow =
                    category === "all" ||
                    category === cardCategory;

                card.style.display = shouldShow
                    ? ""
                    : "none";
            });
        });
    });
}

/* ========================================
   2. PROJECT CARD INTERACTIONS
======================================== */

function initProjectCards() {
    const projectCards = document.querySelectorAll(
        ".project-card"
    );

    projectCards.forEach((card) => {
        // Add keyboard accessibility
        const links = card.querySelectorAll("a");

        links.forEach((link) => {
            link.addEventListener("click", (event) => {
                const href = link.getAttribute("href");

                // Prevent empty or placeholder links
                if (
                    !href ||
                    href === "#" ||
                    href.trim() === ""
                ) {
                    event.preventDefault();
                }
            });
        });
    });
}

/* ========================================
   3. PROJECT CARD HOVER EFFECT
======================================== */

function initProjectHoverEffects() {
    const projectCards = document.querySelectorAll(
        ".project-card"
    );

    projectCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("hovered");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("hovered");
        });
    });
}