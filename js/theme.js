/* =========================================
   TUSHAR MONDAL - SOC ANALYST PORTFOLIO
   File: js/theme.js
   Purpose: Dark and Light Theme Management
========================================= */

"use strict";

/* =========================================
   1. THEME MANAGER
========================================= */

const ThemeManager = {

    /* Default theme */
    defaultTheme: "dark",

    /* Available themes */
    themes: ["dark", "light"],

    /* Storage key */
    storageKey: "tushar-portfolio-theme",

    /* Theme toggle button */
    toggleButton: null,

    /* =====================================
       2. INITIALIZE THEME
    ===================================== */

    init() {
        this.toggleButton = document.querySelector(
            "#themeToggle, #theme-toggle, .theme-toggle"
        );

        this.loadSavedTheme();
        this.initializeToggle();
        this.updateToggleIcon();

        console.log("Theme manager initialized.");
    },

    /* =====================================
       3. LOAD SAVED THEME
    ===================================== */

    loadSavedTheme() {
        let savedTheme = null;

        try {
            savedTheme = localStorage.getItem(
                this.storageKey
            );
        } catch (error) {
            console.warn(
                "Theme preference could not be loaded."
            );
        }

        if (this.themes.includes(savedTheme)) {
            this.setTheme(savedTheme, false);
        } else {
            this.setTheme(this.defaultTheme, false);
        }
    },

    /* =====================================
       4. SET THEME
    ===================================== */

    setTheme(theme, savePreference = true) {

        if (!this.themes.includes(theme)) {
            console.warn("Invalid theme:", theme);
            return;
        }

        /* Apply theme to the document */
        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        /* Update body attribute for compatibility */
        document.body.setAttribute(
            "data-theme",
            theme
        );

        /* Save user preference */
        if (savePreference) {
            try {
                localStorage.setItem(
                    this.storageKey,
                    theme
                );
            } catch (error) {
                console.warn(
                    "Theme preference could not be saved."
                );
            }
        }

        /* Update toggle button */
        this.updateToggleIcon();

        /* Update browser color scheme */
        document.documentElement.style.colorScheme =
            theme;

        /* Dispatch theme change event */
        document.dispatchEvent(
            new CustomEvent("themeChanged", {
                detail: {
                    theme: theme
                }
            })
        );
    },

    /* =====================================
       5. TOGGLE THEME
    ===================================== */

    toggleTheme() {

        const currentTheme =
            document.documentElement.getAttribute(
                "data-theme"
            ) || this.defaultTheme;

        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        this.setTheme(newTheme, true);
    },

    /* =====================================
       6. INITIALIZE TOGGLE BUTTON
    ===================================== */

    initializeToggle() {

        if (!this.toggleButton) {
            console.warn(
                "Theme toggle button not found."
            );
            return;
        }

        this.toggleButton.addEventListener(
            "click",
            () => {
                this.toggleTheme();
            }
        );

        /* Keyboard accessibility */
        this.toggleButton.setAttribute(
            "aria-label",
            "Toggle dark and light theme"
        );

        this.toggleButton.setAttribute(
            "title",
            "Toggle theme"
        );
    },

    /* =====================================
       7. UPDATE TOGGLE ICON
    ===================================== */

    updateToggleIcon() {

        const currentTheme =
            document.documentElement.getAttribute(
                "data-theme"
            ) || this.defaultTheme;

        const icon = this.toggleButton
            ? this.toggleButton.querySelector(
                "i, svg, .theme-icon"
            )
            : null;

        if (icon) {

            if (currentTheme === "dark") {

                icon.classList.remove(
                    "fa-sun",
                    "fa-moon",
                    "sun-icon"
                );

                icon.classList.add("moon-icon");

                if (icon.tagName.toLowerCase() === "i") {
                    icon.classList.add("fas");
                    icon.classList.add("fa-sun");
                    icon.classList.remove("moon-icon");
                }

                this.toggleButton.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );

            } else {

                icon.classList.remove(
                    "fa-sun",
                    "fa-moon",
                    "moon-icon"
                );

                icon.classList.add("sun-icon");

                if (icon.tagName.toLowerCase() === "i") {
                    icon.classList.add("fas");
                    icon.classList.add("fa-moon");
                    icon.classList.remove("sun-icon");
                }

                this.toggleButton.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );
            }
        }
    }
};


/* =========================================
   8. START THEME MANAGER
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {
        ThemeManager.init();
    }
);


/* =========================================
   9. GLOBAL THEME FUNCTIONS
========================================= */

/* Allow other scripts to change the theme */

window.setPortfolioTheme = function (theme) {
    ThemeManager.setTheme(theme, true);
};

window.togglePortfolioTheme = function () {
    ThemeManager.toggleTheme();
};