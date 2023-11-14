document.addEventListener('DOMContentLoaded', () => {
    checkUserSession();
});

function checkUserSession() {
    const sessionToken = localStorage.getItem('userToken');

    if (sessionToken) {
        verifyUserSession(sessionToken);
    } else {
        redirectToSignIn();
    }
}

function verifyUserSession(token) {
    fetch('/verifyToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.valid) {
            console.log('User is authenticated, UID:', data.uid);
            setupAuthenticatedUserInterface();
        } else {
            console.error('User is not authenticated. Redirecting to login...');
            redirectToSignIn();
        }
    })
    .catch(error => {
        console.error('Error verifying token:', error);
        redirectToSignIn();
    });
}

function setupAuthenticatedUserInterface() {
    setupCreateConversationForm();
    loadConversations();
    setupLogoutButton();
}


function setupCreateConversationForm(token) {
    document.getElementById('createConversationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const members = document.getElementById('participants').value.split(',').map(s => s.trim());
        const lastMessage = document.getElementById('initialMessage').value;
        createConversation({ title, members, lastMessage }, token);
    });
}

function loadConversations(token) {
    fetch('/conversations', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => validateResponse(response))
    .then(data => displayConversations(data.conversations))
    .catch(error => console.error('Error loading conversations', error));
}


function createConversation(conversationData, token) {
    fetch('/conversations/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(conversationData)
    })
    .then(response => validateResponse(response))
    .then(data => {
        console.log('Conversation created', data);
        loadConversations();
    })
    .catch(error => console.error('Error creating conversation', error));
}

function displayConversations(conversations) {
    const conversationsContainer = document.getElementById('conversationsContainer');
    conversationsContainer.innerHTML = '';

    if (conversations && typeof conversations === 'object') {
        Object.keys(conversations).forEach(conversationId => {
            const conversation = conversations[conversationId];
            const conversationElem = document.createElement('div');
            conversationElem.className = 'conversation-item'; 

            const titleElem = document.createElement('h3');
            titleElem.innerText = conversation.title || 'No title';
            conversationElem.appendChild(titleElem);

            const initialMessageElem = document.createElement('p');
            initialMessageElem.innerText = `Initial Message: ${conversation.lastMessage || 'No initial message'}`;
            conversationElem.appendChild(initialMessageElem);

            if (Array.isArray(conversation.members)) {
                const membersListElem = document.createElement('ul');
                conversation.members.forEach(memberId => {
                    const memberElem = document.createElement('li');
                    memberElem.innerText = memberId; 
                    membersListElem.appendChild(memberElem);
                });
                conversationElem.appendChild(membersListElem);
            } else {
                const noMembersElem = document.createElement('p');
                noMembersElem.innerText = 'No members';
                conversationElem.appendChild(noMembersElem);
            }

            conversationsContainer.appendChild(conversationElem);
        });
    } else {
        const errorElem = document.createElement('div');
        errorElem.innerText = 'No conversations to display';
        conversationsContainer.appendChild(errorElem);
    }
}

function setupLogoutButton() {
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', () => {
        fetch('/signout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Logout failed.');
            }
            return response.json();
        })
        .then(() => {
            console.log('Signed out');
            window.location.href = '../sign-in.html';
        })
        .catch(error => {
            console.error('Error signing out', error);
        });
    });
}

function validateResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}
function redirectToSignIn() {
    window.location.href = '../sign-in.html';
}
