document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Gather form data
        const formData = new FormData(form);

        // Send form data to Formspree endpoint
        fetch(form.action, {
            method: form.method,
            body: formData
        })
        .then(response => {
            if (response.ok) {
                formResponse.innerHTML = "<p class='text-success'>Thank you for your message! We will get back to you soon.</p>";
                form.reset(); // Clear the form after successful submission
            } else {
                formResponse.innerHTML = "<p class='text-danger'>Oops! Something went wrong. Please try again later.</p>";
            }
        })
        .catch(error => {
            formResponse.innerHTML = "<p class='text-danger'>Oops! Something went wrong. Please try again later.</p>";
        });
    });
});
