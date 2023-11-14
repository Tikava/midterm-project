document.addEventListener('DOMContentLoaded', (event) => {
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const passwordResetModal = document.getElementById('passwordResetModal');
    const passwordResetForm = document.getElementById('passwordResetForm');
    const closeSpan = document.querySelector('.modal .close');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(event) {
            event.preventDefault();
            passwordResetModal.style.display = 'block';
        });
    }

    if (passwordResetForm) {
        passwordResetForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('resetEmail').value;
            resetPassword(email);
        });
    }

    if (closeSpan) {
        closeSpan.addEventListener('click', function() {
            passwordResetModal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === passwordResetModal) {
            passwordResetModal.style.display = 'none';
        }
    });
});

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/signin', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errData => {
                throw new Error(errData.message || `HTTP error! status: ${response.status}`);
            });
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('userToken', data.idToken);
        console.log('Login successful', data);
        showMessage('Login successful');
        window.location.href = '../dashboard.html';    
    })
    .catch(error => {
        console.error('Login error', error);
        showMessage(error.message || 'An error occurred during login.');
    });
}

function resetPassword(email) {
    fetch('/reset-password', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Password reset email sent', data);
        showMessage('Password reset email sent, please check your inbox.'); 
    })
    .catch(error => {
        console.error('Password reset error', error);
        showMessage('Error sending password reset email.');
    })
    .finally(() => {
        const passwordResetModal = document.getElementById('passwordResetModal');
        passwordResetModal.style.display = 'none';
    });
}

function showMessage(message) {
    alert(message);
}

        