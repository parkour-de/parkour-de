---
layout: page_no_toc
title: Login
permalink: /api-client/login
hidden: true
form: true
---

<script src="utils.js"></script>

<div class="container">
    <form id="loginForm">
        <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <p>Please enter your username.</p>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <p>Please enter your password.</p>
        </div>
        <button type="submit" class="btn">Login</button>
    </form>
</div>

<script>
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const token = await loginUser(username, password);
            saveToken(token);
            saveCredentials(username, password);
            alert('Login successful');
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    });
</script>