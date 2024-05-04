---
layout: page_no_toc
title: Mitmachen
permalink: /kontakt/
---

Es gibt verschiedene Wege bei der Gründung des Verbandes mitzuwirken. Wir sind immer auf der Suche nach **Vereinen und Sparten**, die Parkour betreiben, **Unternehmen**, die im Parkourbereich arbeiten und **Athletinnen und Athleten**, die sich für einen Parkourverband begeistern können.

## Komm in die Gruppe

1. Trete unserer [WhatsApp Community](https://chat.whatsapp.com/{{site.whatsapp_group| cgi_escape | escape }}) bei. Dort werden wir Fragen klären und direkter kommunizieren!
2. Aboniere unseren [Emailverteiler](https://newsletter.8bj.de/subscription/form). Über diesen werden wir die Termine und Protokolle von öffentlichen Treffen schicken und dich über relevante Entscheidungen und Meilensteine informieren.
3. Du willst mithelfen? Schreibe uns eine [Email](mailto:info@parkour-deutschland.de)

## Parkourvereine in Deutschland

Aktuell erstellen wir eine Liste mit den **Parkourgruppen und Vereinen in Deutschland** und benötigen Hilfe. Wenn ihr noch nicht in der Übersicht seid, dann tragt euch bitte als Gruppe, Abteilung oder Verein mit [diesem Formular](https://share.parkour-deutschland.de/apps/forms/s/GPbm9GsgnAfAtXFgRFSmXJ36) in unsere Übersicht ein.

<table id="vereine-table">
  <thead>
    <tr>
      <th>Bundesland</th>
      <th>Stadt</th>
      <th>Gruppe/Verein</th>
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
