document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('registrationForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('/signup', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Successfully registered', data);
            window.location.href = '../dashboard.html';
        })
        .catch(error => {
            console.error('Registration error', error);
        });
    });
});
