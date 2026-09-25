
/* ========================================
   TUSHAR MONDAL - PORTFOLIO CONTACT
   File: js/contact.js
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    initContactForm();
});

/* ========================================
   1. CONTACT FORM
======================================== */

function initContactForm() {
    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameInput = contactForm.querySelector(
            '[name="name"]'
        );

        const emailInput = contactForm.querySelector(
            '[name="email"]'
        );

        const subjectInput = contactForm.querySelector(
            '[name="subject"]'
        );

        const messageInput = contactForm.querySelector(
            '[name="message"]'
        );

        if (
            !nameInput ||
            !emailInput ||
            !messageInput
        ) {
            showContactMessage(
                contactForm,
                "Contact form fields are missing.",
                "error"
            );

            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput
            ? subjectInput.value.trim()
            : "Portfolio Contact";

        const message = messageInput.value.trim();

        // Validate required fields
        if (!name || !email || !message) {
            showContactMessage(
                contactForm,
                "Please fill in all required fields.",
                "error"
            );

            return;
        }

        // Validate email format
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            showContactMessage(
                contactForm,
                "Please enter a valid email address.",
                "error"
            );

            return;
        }

        // Prepare email content
        const recipient = "tushar23016@gmail.com";

        const emailSubject = encodeURIComponent(
            subject || "Portfolio Contact"
        );

        const emailBody = encodeURIComponent(
            `Hello Tushar,\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`
        );

        const mailtoLink =
            `mailto:${recipient}` +
            `?subject=${emailSubject}` +
            `&body=${emailBody}`;

        // Open the user's default email application
        window.location.href = mailtoLink;

        showContactMessage(
            contactForm,
            "Your email application should open. Please send the email to complete your message.",
            "success"
        );
    });
}

/* ========================================
   2. CONTACT FORM FEEDBACK
======================================== */

function showContactMessage(
    form,
    message,
    type
) {
    let messageElement = form.querySelector(
        ".form-message"
    );

    // Create feedback element if it doesn't exist
    if (!messageElement) {
        messageElement = document.createElement("div");

        messageElement.className = "form-message";

        messageElement.setAttribute(
            "role",
            "status"
        );

        messageElement.setAttribute(
            "aria-live",
            "polite"
        );

        form.appendChild(messageElement);
    }

    messageElement.textContent = message;

    messageElement.className =
        `form-message ${type}`;

    messageElement.style.display = "block";
}