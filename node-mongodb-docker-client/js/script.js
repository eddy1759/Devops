
function toggleForm(formId) {
    document.getElementById('login-section').classList.remove('active');
    document.getElementById('register-section').classList.remove('active');
    document.getElementById(formId).classList.add('active');
}

function handleFormSubmission(formId, apiEndpoint) {
    const form = document.getElementById(formId);
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.status === 200) {
                // Successful response, you can redirect the user to the book page
                window.location.href = '/book-page.html'; // Replace with your actual book page URL
            } else {
                // Handle error responses here (e.g., display an error message)
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    });
}
