---
layout: page
title: Mitmachen
permalink: /kontakt/
---

Hier findest du die Wege bei der Gründung des Verbandes mitzuwirken oder Neuigkeiten zu erfahren

## Auf dem Laufenden bleiben

Wenn du Interesse an der Initiative und am Prozess der Gründung hast, dann aboniere unseren [Emailverteiler](https://newsletter.8bj.de/subscription/form). Über den Verteiler werden wir die Termine und Protokolle von öffentlichen Treffen schicken und dich über relevante Entscheidungen und Meilensteine informieren.

Ansonsten kannst du natürlich in unsere [WhatsApp Gruppe für Interessierte](https://chat.whatsapp.com/{{site.whatsapp_group| cgi_escape | escape }}) kommen!

## Gründungsmitglied werden

Du willst deine Stimme für den Deutschen Parkourverband e.V. einsetzen? Dann melde dich bei uns! Mitglieder können werden:

- **Vereinen und Sparten**, die Parkour machen
- **Unternehmen**, die im Parkourbereich arbeiten
- **Athletinnen und Athleten**

Als Mitglieder im Verband bekommt ihr ein Stimmrecht in der Mitgliederversammlung und unterstützt die **Selbstvertretung des Parkoursports** gegenüber dem organisierten Sport in Deutschland.

## Mitarbeiten

**Hilfe ist immer willkommen**. Wenn du dich engagieren willst und dir vorstellen kannst Aufgaben im Deutschen Parkourverband zu übernehmen, dann **melde dich bei uns**. Wir laden dich dich dann zu unseren regelmäßigen Treffen ein uns stellen dir den aktuellen Stand der Gründung vor

## Parkourvereine in Deutschland

Hier findet ihr eine Liste der **Parkourvereine in Deutschland**. Wenn du dich als Verein eintragen willst, kannst du das gerne in *diesem Formular* tun.

<table id="vereine-table">
  <thead>
    <tr>
      <th>Bundesland</th>
      <th>Stadt</th> 
      <th>Verein</th>
    </tr>
  </thead>
  <tbody>
    <!-- Table rows will be dynamically added here -->
  </tbody>
</table>

<script>
  fetch('https://8bj.de/api/verband/vereine')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#vereine-table tbody');
      
      data.forEach(verein => {
        const row = document.createElement('tr');
        
        const bundeslandCell = document.createElement('td');
        bundeslandCell.textContent = verein.bundesland;
        row.appendChild(bundeslandCell);
        
        const stadtCell = document.createElement('td');
        stadtCell.textContent = verein.stadt;
        row.appendChild(stadtCell);
        
        const vereinCell = document.createElement('td');
        const vereinLink = document.createElement('a');
        vereinLink.href = verein.webseite;
        vereinLink.target = '_blank';
        vereinLink.textContent = verein.name;
        vereinCell.appendChild(vereinLink);
        row.appendChild(vereinCell);
        
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
</script>
