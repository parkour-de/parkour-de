---
layout: page_no_toc
title: Register
permalink: /api-client/register
hidden: true
form: true
---

<script src="utils.js"></script>

<div class="container">
  <form id="registerForm">
    <div class="form-group">
      <label for="key">Please choose a username:</label>
      <input type="text" id="key" name="key" required>
      <p>Between 3 and 30 characters. You can use letters, numbers, and -_. Just no period (.) at the start.</p>
      <p>If this is too restrictive for you, don't worry: Your <strong>display name</strong> can be anything you like.</p>
    </div>
    <div class="form-group">
      <label for="name">Your name:</label>
      <input type="text" id="name" name="name" maxlength="100" required>
      <p>Very little restrictions here. Just keep it max 100 characters.</p>
    </div>
    <div class="form-group">
      <label for="type">What user type do you represent?</label>
      <p>No matter what you choose here, your experience will always be the same! But when other people search or find you, they know who you represent.</p>
      <p>If you want to represent more than one of the following, consider creating more accounts later!</p>
      <select id="type" name="type" required>
        <option value="user" selected>user - Not specified role</option>
        <option value="athlete">athlete - An athlete is actively doing Parkour</option>
        <option value="coach">coach - A coach is teaching Parkour to others</option>
        <option value="team">team - A team has clearly defined members and is working on Parkour projects together</option>
        <option value="group">group - A group of people who do their training together, but don't want or need to be a team</option>
        <option value="association">association - An association is organised and offers classes to its members</option>
        <option value="freelancer">freelancer - A freelancer is a person who is running a business, but is not a company</option>
        <option value="company">company - A company is a legal entity that is offering services to its customers</option>
        <option value="school">school - A school is an institution that offers education</option>
        <option value="government">government - This could be a government agency, a ministry, a city, a state, a country, etc.</option>
        <option value="robot">robot - A robot is a computer program that is running on a server.</option>
      </select>
    </div>
    <button type="submit" class="btn">Register</button>
  </form>
</div>

<script>
  document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const key = document.getElementById('key').value;
    const username = document.getElementById('name').value;
    const type = document.getElementById('type').value;

    try {
      const token = await registerUser(key, username, type);
      saveToken(token);
      saveCredentials(key, null);
      window.location.href = '/api-client/set-password';
      alert('Registration successful. Set up your password within 30 minutes.');
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  });

  async function registerUser(key, username, type) {
    const response = await fetch(`https://8bj.de/api/user/${key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, type })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    
    return await response.json();
  }
</script>