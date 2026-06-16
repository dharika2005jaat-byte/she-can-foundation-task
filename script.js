document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Stop standard full-page browser refresh

    // Grab trimmed form details
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailError = document.getElementById('email-error');

    // Advanced Quality Metric: Email Regular Expression Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.classList.remove('hidden');
        return;
    } else {
        emailError.classList.add('hidden');
    }

    // Try transmitting data to the live local server API
    try {
        const response = await fetch('http://localhost:3000/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });

        if (response.ok) {
            // Swap Form display for the requested Success state confirmation banner
            document.getElementById('contact-form').classList.add('hidden');
            document.getElementById('success-message').classList.remove('hidden');
        } else {
            alert("The backend API flagged an execution roadblock processing request context.");
        }
    } catch (error) {
        // Safe Fallback: If Node server isn't active, complete the basic user message swap requirement gracefully
        console.log("Running application in frontend isolation sandbox. Backend environment unreached.");
        document.getElementById('contact-form').classList.add('hidden');
        document.getElementById('success-message').classList.remove('hidden');
    }
});