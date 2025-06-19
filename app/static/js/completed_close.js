let tickets = [];

function renderTickets() {
  const tbody = document.getElementById('ticketTableBody');
  tbody.innerHTML = '';
  tickets.forEach((t, idx) => {
    tbody.innerHTML += `
      <tr>
        <td>${t.name}</td>
        <td>${t.number}</td>
        <td>${t.address || ''}</td>
        <td>${t.appliance || ''}</td>
        <td>${t.time || ''}</td>
        <td>${t.notes || ''}</td>
      </tr>
    `;
  });
}

document.getElementById('exportExcelBtn').addEventListener('click', function() {
  const ws = XLSX.utils.json_to_sheet(tickets);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Completed Closed');
  XLSX.writeFile(wb, 'completed_closed.xlsx');
});

function loadTickets() {
  fetch('/api/completed_closed')
    .then(res => res.json())
    .then(data => {
      tickets = data;
      renderTickets();
    });
}

loadTickets();