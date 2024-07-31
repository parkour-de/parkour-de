---
layout: page_no_toc
title: Set Password
permalink: /api-client/set-password
hidden: true
form: true
---

<script src="utils.js"></script>

<div class="container">
    <form id="setPasswordForm">
        <div class="form-group">
            <label for="password">Please choose a password:</label>
            <input type="password" id="password" name="password" required>
        </div>
        <div id="suggestedPasswords" class="form-group">
            <p>Today is not your creative day? What about this one:</p>
            <ul id="passwordSuggestions">
                <!-- Suggested passwords will be populated here -->
            </ul>
            <button type="button" class="btn" id="refreshSuggestions">Try something else</button>
        </div>
        <button type="submit" class="btn">Next</button>
    </form>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        fetchPasswordSuggestions();
    });

    document.getElementById('refreshSuggestions').addEventListener('click', fetchPasswordSuggestions);

    async function fetchPasswordSuggestions() {
        try {
            const response = await fetch('/api/password/suggest');
            if (!response.ok) {
                throw new Error('Failed to fetch password suggestions');
            }
            const suggestions = await response.json();
            const suggestionsList = document.getElementById('passwordSuggestions');
            suggestionsList.innerHTML = '';
            suggestions.forEach(password => {
                const listItem = document.createElement('li');
                listItem.textContent = password;
                suggestionsList.appendChild(listItem);
            });
        } catch (error) {
            /* alert('Error: ' + error.message); */
        }
    }

    document.getElementById('setPasswordForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const password = document.getElementById('password').value;

        try {
            const token = await setPassword(password);
            sessionStorage.setItem('password', password);
            saveToken(token);
            alert('Password set successfully');
        } catch (error) {
            alert('Failed to set password: ' + error.message);
        }
    });

    async function setPassword(password) {
        const key = getUserKey();
        const token = await getToken();
        if (!key || !token) {
          throw new Error('No credentials stored');
        }
        const response = await fetch(`https://8bj.de/api/user/${key}/password`, {
            method: 'POST',
            headers: {
                'Authorization': `user ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to set password');
        }

        return await response.json();
    }
</script>
