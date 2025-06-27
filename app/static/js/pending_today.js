function createActionIcons(number) {
  const call = `<a href='tel:${number}' title='Call'><i class='fa fa-phone text-success'></i></a>`;
  const wa = `<a href='https://wa.me/91${number}' target='_blank' title='WhatsApp'><i class='fab fa-whatsapp text-success'></i></a>`;
  return `${call} ${wa}`;
}

function renderTickets(tickets) {
  const tbody = document.getElementById('ticketTableBody');
  tbody.innerHTML = '';

  tickets.forEach(ticket => {
    tbody.innerHTML += `
      <tr>
        <td>${ticket.name}</td>
        <td>${ticket.number} ${createActionIcons(ticket.number)}</td>
        <td>${ticket.address || ''}</td>
        <td>${ticket.appliance || ''}</td>
        <td>${ticket.time || ''}</td>
        <td>${ticket.notes || ''}</td>
      </tr>
    `;
  });
}

function fetchTickets() {
  fetch('/api/pending_today')
    .then(response => response.json())
    .then(data => renderTickets(data))
    .catch(err => console.error("Error fetching data:", err));
}

fetchTickets(); // 🟢 Call on load
